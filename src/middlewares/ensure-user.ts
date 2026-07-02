import { Context, NextFunction } from "grammy";
import { findOrCreateUser } from "../services/user/user.service";

export const ensureUserMiddleware = async (
  ctx: Context,
  next: NextFunction,
) => {
  if (ctx.from) {
    await findOrCreateUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
  }

  return next();
};
