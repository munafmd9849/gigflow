import type { Types } from "mongoose";

export enum UserRole {
  Admin = "Admin",
  Sales = "Sales",
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDocument extends User {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
