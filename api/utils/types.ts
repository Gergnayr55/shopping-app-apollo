import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Skin {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface InsertOrder {
  userId: string;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  items: Array<CartItemInput>;
}
export interface Order extends InsertOrder {
  _id: ObjectId;
}
export interface SavedCart {
  userId: string;
  items: Array<CartItem>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  _id: ObjectId;
  userId: string;
  skinId: string;
  quantity: number;
}

export interface CartItemInput {
  _id: ObjectId;
  name: string;
  category: string;
  description: string;
  image: string;
  rate: number | null;
  count: number | null;
  quantity: number;
}

export interface InsertDocumentRes {
  acknowledged: boolean;
  upsertedId?: ObjectId;
  insertedId?: ObjectId;
}

export interface UserRes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface NewUser extends UserRes {
  createdAt?: Date;
  updatedAt?: Date;
}
