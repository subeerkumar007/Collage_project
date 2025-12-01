import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string; // hashed
  createdAt?: Date;
  updatedAt?: Date;
}

export function createUserObject(name: string, email: string, hashedPassword: string): IUser {
  return {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
