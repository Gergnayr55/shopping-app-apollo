import { gql } from "apollo-server-express";
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  type Mutation {
    login(email: String, password: String): User
    logout: Boolean
    registration(
      email: String
      password: String
      firstName: String
      lastName: String
    ): User
    handleOrder(cartItems: [CartItem], userId: ID, total: Float): OrderRes
    handleCart(cartItems: [CartItem], userId: ID): CartRes
  }

  type User {
    _id: ID!
    email: String
    password: String
    firstName: String
    lastName: String
  }

  type Skin {
    _id: ID
    name: String
    price: Float
    description: String
    category: String
    image: String
    rate: Float
    count: Int
  }

  input CartItem {
    _id: ID
    name: String
    price: Float
    description: String
    category: String
    image: String
    rate: Float
    count: Int
    quantity: Int
  }

  type OrderItem {
    _id: ID
    name: String
    price: Float
    description: String
    category: String
    image: String
    rate: Float
    count: Int
    quantity: Int
  }

  type OrderRes {
    id: ID
  }

  type Orders {
    _id: ID
    items: [OrderItem]
    userId: String
    createdAt: String
    status: String
    total: Float
  }

  type CartRes {
    id: ID
  }
  type UserCart {
    cart: [OrderItem]
    userId: String
    updatedAt: String
  }

  type Query {
    loggedInUser: User
    getSkin(_id: ID!): Skin
    getOrder(_id: ID!): Orders
    getSkins: [Skin]
    getOrders: [Orders]
    getUserCart: [UserCart]
  }
`;
