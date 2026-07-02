import { Document } from "mongoose";

export interface IUser extends Document {
  telegramId: number;
  username?: string;
  firstname?: string;
  createdAt: Date;
  lastActiveAt: Date;
}
