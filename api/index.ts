import { ApolloServer } from '@apollo/server';
import { typeDefs } from "./schema";
import { seedData } from './data/product-data-local';
import { expressMiddleware } from '@as-integrations/express4';
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import {
  User,
  Skin,
  Order,
  CartItem,
  SavedCart,
  InsertDocumentRes,
  CartItemInput,
} from "./utils/types";
import { validateTokensMiddleware } from "./middleware";
import { userRepo, skinRepo, orderRepo, cartRepo, seedDatabase } from "./dbconnection";
import config from "./config/config";
import { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";

import {
  setTokens,
  tokenCookies,
  validateUserPw,
  hashPassword,
  isMyObjectEmpty,
} from "./utils";

function requireAuth(req: Request, res: Response): void {
  if (isMyObjectEmpty(req.user)) {
    res.clearCookie("access");
    res.clearCookie("refresh");
    throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
  }
}

const resolvers = {
  Query: {
    getSkin: async (
      _: any,
      args: { _id: string },
      { req, res }: { req: Request; res: Response }
    ): Promise<Skin | undefined | null> => {
      try {
        requireAuth(req, res);
        const skinId = new ObjectId(args._id);
        if (skinId) {
          return await skinRepo.findOne({ _id: skinId });
        } else {
          throw new Error("Missing required params");
        }
      } catch (e) {
        console.error(e);
        if (e instanceof GraphQLError) throw e;
      }
    },
    getOrder: async (
      _: any,
      args: { _id: string },
      { req, res }: { req: Request; res: Response }
    ): Promise<Order | null | undefined> => {
      try {
        requireAuth(req, res);
        if (args._id) {
          const myId = new ObjectId(args._id);
          return await orderRepo.findOne({ _id: myId });
        }
      } catch (e) {
        console.error("Failed to get order", e);
        if (e instanceof GraphQLError) throw e;
      }
    },
    getSkins: async (
      _: any,
      __: any,
      { req, res }: { req: Request; res: Response }
    ): Promise<Skin[] | undefined> => {
      try {
        requireAuth(req, res);
        return await skinRepo.find().toArray();
      } catch (e) {
        console.error(e);
        if (e instanceof GraphQLError) throw e;
      }
    },
    getOrders: async (
      _: any,
      __: any,
      { req, res }: { req: Request; res: Response }
    ): Promise<Order[] | undefined> => {
      try {
        requireAuth(req, res);
        const myId = req.user.id.toString();
        return await orderRepo.find({ userId: myId }).toArray();
      } catch (e) {
        console.error("Failed to get orders", e);
        if (e instanceof GraphQLError) throw e;
      }
    },
    getUserCart: async (
      _: any,
      { req, res }: { req: Request; res: Response }
    ): Promise<any[] | undefined> => {
      try {
        if (isMyObjectEmpty(req.user)) {
          res.clearCookie("access");
          res.clearCookie("refresh");
          throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
        } else if (req.user) {
          const userId = req.user.id.toString();
          return await cartRepo.find({ userId: userId }).toArray();
        }
      } catch (e) {
        console.error("Failed to get user's cart", e);
        if (e instanceof GraphQLError) throw e;
      }
    },
  },
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string },
      { req, res }: { req: Request; res: Response }
    ): Promise<User | null | undefined> => {
      try {
        const user = await userRepo.findOne({
          email: email,
        });

        if (!user) return null;
        else if (user) {
          const isValid = await validateUserPw(password, user.password);
          if (!isValid) return null;
          else {
            const tokens = setTokens(user);

            const cookies = tokenCookies(tokens);

            // @ts-ignore
            res.cookie(...cookies.access);
            // @ts-ignore
            res.cookie(...cookies.refresh);
            return user;
          }
        }
      } catch (e) {
        console.error("Failed to post login info", e);
      }
    },
    logout: async (
      _: any,
      __: any,
      { res }: { res: any }
    ): Promise<boolean | undefined> => {
      try {
        res.clearCookie("access");
        res.clearCookie("refresh");
        return true;
      } catch (e) {
        console.error("Failed on logout", e);
      }
    },
    registration: async (
      _: any,
      {
        email,
        password,
        firstName,
        lastName,
      }: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      },
      { res }: { res: Response }
    ): Promise<User | null | undefined> => {
      try {
        const userExists = await userRepo.findOne({ email });
        if (userExists) return null;
        const hashedPw = await hashPassword(password);
        if (!hashedPw) return null;
        const result = await userRepo.insertOne({
          email,
          password: hashedPw,
          firstName,
          lastName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return await userRepo.findOne({ _id: result.insertedId }) ?? null;
      } catch (e) {
        console.error("Failed on registration", e);
      }
    },
    handleOrder: async (
      _: any,
      {
        cartItems,
        userId,
        total,
      }: { cartItems: CartItemInput[]; userId: string; total: number },
      { req, res }: { req: Request; res: Response }
    ): Promise<{ id: string | null } | undefined> => {
      try {
        requireAuth(req, res);
        if (req.user.id.toString() !== userId) {
          throw new GraphQLError('Forbidden', { extensions: { code: 'FORBIDDEN' } });
        }
        const myOrder = await orderRepo.insertOne({
          items: cartItems,
          userId: userId,
          total: total,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "PENDING",
        });
        if (myOrder && myOrder.acknowledged) {
          const returnId = myOrder.insertedId
            ? myOrder.insertedId.toString()
            : null;
          return { id: returnId };
        }
      } catch (e) {
        console.error("Failed on submit order", e);
      }
    },
    handleCart: async (
      _: any,
      { cartItems, userId }: { cartItems: Array<CartItem>; userId: string },
      { res }: { res: Response }
    ): Promise<{ id: ObjectId | null } | undefined> => {
      try {
        const existingCart = await cartRepo.findOne({
          userId: userId,
        });
        let myShoppingCartRes: any | undefined = undefined;
        if (existingCart) {
          myShoppingCartRes = await cartRepo.updateOne(
            { userId: existingCart.userId },
            {
              $set: {
                cart: cartItems,
                userId: userId,
                updatedAt: new Date(),
              },
            }
          );
        } else {
          myShoppingCartRes = await cartRepo.insertOne({
            items: cartItems,
            userId: userId,
            updatedAt: new Date(),
          });
        }

        if (myShoppingCartRes && myShoppingCartRes.acknowledged) {
          const returnId = myShoppingCartRes?.upsertedId
            ? myShoppingCartRes?.upsertedId
            : myShoppingCartRes.insertedId;
          if (returnId) return { id: returnId };
        } else {
          return { id: null };
        }
      } catch (e) {
        console.error("Failed on add item to cart", e);
      }
    },
  },
};
const corsConfig: CorsOptions = {
  origin: config.CLIENT_URL,
  credentials: true,
};

async function startApolloServer() {
  try {
    // interface MyContext {
    //   token?: string;
    // }
    
    // Apollo 4
    const server = new ApolloServer<any>({
      typeDefs,
      resolvers
    });

    await server.start();

    const existingProducts = await skinRepo.countDocuments();
    if (existingProducts === 0) {
      await seedDatabase('test', seedData);
    }

    const existingUsers = await userRepo.countDocuments();
    if (existingUsers === 0) {
      const hashedPw = await hashPassword(config.TEST_USER_PASSWORD);
      await userRepo.insertOne({
        email: config.TEST_USER_EMAIL,
        password: hashedPw ?? '',
        firstName: 'Test',
        lastName: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const app = express();
    app.use(cookieParser());
    app.use(validateTokensMiddleware);
     // Apollo 4
    app.use('/graphql',

      cors<cors.CorsRequest>(corsConfig),
    
      express.json(),
    
      expressMiddleware(server, {
    
        // context: async ({ req }) => ({ token: req.headers.token }),
        context: async ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
    
      }),
    
    );

    try {
      await new Promise<void>((resolve) =>
        app.listen({ port: config.API_PORT }, resolve)
      );
      console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    } catch (e) {
      console.log("Failed to listen on port", e);
    }
  } catch (e) {
    console.log("Failed to startApolloServer", e);
  }
}

startApolloServer();
export {};
