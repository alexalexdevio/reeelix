import { IContext } from "../types/global.types";
import { mainKeyboard } from "../keyboards/main.keyboard";

export const start = async (ctx: IContext) => {
  await ctx.reply(
    `Привіт ${ctx.from?.first_name ?? "друже!"}. \n\n` +
    `Я допоможу тобі знайти фільм для перегляду 🎬`,
    {
      reply_markup: mainKeyboard,
    },
  );
};
