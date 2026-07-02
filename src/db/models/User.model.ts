import { Schema, model } from "mongoose";
import { IUser } from "../../types/User.types";

const userSchema = new Schema<IUser>({
  telegramId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  firstname: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model<IUser>("User", userSchema);
