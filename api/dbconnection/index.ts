import { MongoClient, Db, Collection } from "mongodb";
import config from "../config/config";
import { SavedCart, Order, Skin, NewUser, InsertOrder, CartItem, User } from "../utils/types";
const MONGO_URI = config.MONGO_URI;

export const client: MongoClient = new MongoClient(MONGO_URI);

export async function seedDatabase(db_name: string, data: Array<Skin | User | Order | CartItem>) {
  try {
    const newDB: Db = client.db(db_name);

    newDB.createCollection("skins");
    newDB.createCollection("myUsers");
    newDB.createCollection("orders");
    newDB.createCollection("userCart");

    if (!!data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          await newDB.collection("skins").insertOne(data[i] as Skin);
        } catch (e) {
          console.log("failed to insert item into collection", e);
        }
      }
    }

    console.log(`Successfully seeded database: ${newDB.databaseName}`);
  } catch (e) {
    console.log("failed to seed Mongo", e);
  }
}

const db: Db = client.db("test");

export const userRepo: Collection<NewUser> = db.collection("myUsers");
export const skinRepo: Collection<Skin> = db.collection("skins");
export const orderRepo: Collection<InsertOrder> = db.collection("orders");
export const cartRepo: Collection<SavedCart> = db.collection("userCart");
