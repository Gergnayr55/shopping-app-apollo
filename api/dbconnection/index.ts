import { MongoClient, Db, Collection } from "mongodb";
import config from "../config/config";
import { SavedCart, Order, Skin, NewUser, InsertOrder } from "../utils/types";
const MONGO_URI = config.MONGO_URI;

const client: MongoClient = new MongoClient(MONGO_URI);

export async function connectToDatabase() {
  const client: MongoClient = new MongoClient(MONGO_URI);
  try {
    await client.connect();

    const db: Db = client.db("test");

    collections.userRepo = db.collection("myUsers");
    collections.skinRepo = db.collection("skins");
    collections.orderRepo = db.collection("orders");
    collections.cartRepo = db.collection("userCart");

    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (e) {
    console.log("failed to connect to Mongo", e);
  }
}
client.connect((err) => {
  const collection: Collection = client.db("test").collection("myUsers");

  if (!err) {
    collection
      .findOne({
        email: "gergnayr@aol.com",
      })
      .then((res) => console.log(`User:`, res));
    console.log("MongoDB client connected");
  } else {
    console.error(err);
  }
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
