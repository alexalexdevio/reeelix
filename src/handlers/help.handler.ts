import { IContext } from "../types/global.types";

export const help = async (ctx: IContext) => {
  await ctx.reply("Треба внести текс для підсказок користувачу.");
};
