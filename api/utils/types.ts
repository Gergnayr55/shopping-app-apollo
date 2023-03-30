const { ObjectId } = require("mongodb");

export interface User {
  _id: typeof ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Skin {
  _id: typeof ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Order {
  _id: typeof ObjectId;
  userId: string;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  items: Array<CartItemInput>;
}

export interface SavedCart {
  _id: typeof ObjectId;
  userId: string;
  items: Array<CartItem>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  _id: typeof ObjectId;
  userId: string;
  skinId: string;
  quantity: number;
}

export interface CartItemInput {
  _id: typeof ObjectId;
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
  upsertedId?: typeof ObjectId;
  insertedId?: typeof ObjectId;
}

export interface UserRes {
  _id: typeof ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface NewUser extends UserRes {
  createdAt?: Date;
  updatedAt?: Date;
}
