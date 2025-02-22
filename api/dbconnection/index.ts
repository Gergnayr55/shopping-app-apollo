import { MongoClient, Db, Collection } from "mongodb";
import config from "../config/config";
import { SavedCart, Order, Skin, NewUser, InsertOrder, CartItem, User } from "../utils/types";
const MONGO_URI = config.MONGO_URI;

export const client: MongoClient = new MongoClient(MONGO_URI);

export async function connectToDatabase(db_name: string ) {
  const client: MongoClient = new MongoClient(MONGO_URI);
  try {
    await client.connect();

    const db: Db = client.db(db_name);

    collections.userRepo = db.collection("myUsers");
    collections.skinRepo = db.collection("skins");
    collections.orderRepo = db.collection("orders");
    collections.cartRepo = db.collection("userCart");

    console.log(`Successfully connected to database: ${db.databaseName}`);
    collections.userRepo.findOne({
      email: "gergnayr@aol.com",
    }).then((res) => console.log(`User:`, res));
  } catch (e) {
    console.log("failed to connect to Mongo", e);
  }
}

export async function seedDatabase(db_name: string, data: Array<Skin | User | Order | CartItem>) {
  const client: MongoClient = new MongoClient(MONGO_URI);
  try {
    await client.connect();

    const newDB: Db = client.db(db_name);

    newDB.createCollection("skins");
    newDB.createCollection("myUsers");
    newDB.createCollection("orders");
    newDB.createCollection("userCart");

    if (!!data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          await skinRepo.insertOne(data[i] as Skin);
        } catch (e) {
          console.log("failed to insert item into collection", e);
        }
      }
    }

    console.log(`Successfully connected to database: ${db.databaseName}`);

  } catch (e) {
    console.log("failed to connect to Mongo", e);
  }
}
  connectToDatabase('test')
    .then(console.error)
    .catch(console.error)
    .finally(() => {
      console.log("MongoDB client connected");
    });

export const collections:
  | {
      userRepo: Collection;
      skinRepo: Collection;
      orderRepo: Collection;
      cartRepo: Collection;
    }
  | { userRepo: ""; skinRepo: ""; orderRepo: ""; cartRepo: "" } = {
  userRepo: "",
  skinRepo: "",
  orderRepo: "",
  cartRepo: "",
};

const db: Db = client.db("test");

export const userRepo: Collection<NewUser> = db.collection("myUsers");
export const skinRepo: Collection<Skin> = db.collection("skins");
export const orderRepo: Collection<InsertOrder> = db.collection("orders");
export const cartRepo: Collection<SavedCart> = db.collection("userCart");
