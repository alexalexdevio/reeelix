import { UserModel } from "../../db/models/User.model";
import { IUser } from "../../types/User.types";

export const findOrCreateUser = async (
  telegramId: number,
  username?: string,
  firstname?: string,
): Promise<IUser> => {
  const existing = await UserModel.findOne({ telegramId });

  if (existing) {
    existing.lastActiveAt = new Date();
    await existing.save();
    return existing;
  }

  return UserModel.create({ telegramId, username, firstname });
};

export const getUserByTelegramId = async (
  telegramId: number,
): Promise<IUser | null> => {
  return await UserModel.findOne({ telegramId });
};

export const deleteUser = async (telegramId: number): Promise<void> => {
  await UserModel.deleteOne({ telegramId });
};
