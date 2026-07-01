import { CallbackQueryContext } from "grammy";
import { IContext } from "../types/global.types";
import { mainKeyboard } from "../keyboards/main.keyboard";

export const backToMainHandler = async (
  ctx: CallbackQueryContext<IContext>,
) => {
  await ctx.answerCallbackQuery();
  await ctx.callbackQuery.message?.editText(
    `Привіт ${ctx.from?.first_name ?? "друже!"}. \n\n` +
    `Я допоможу тобі знайти фільм для перегляду 🎬`,
    {
      reply_markup: mainKeyboard,
    },
  );
};
