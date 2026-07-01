import { CallbackQueryContext } from "grammy";
import { IContext } from "../types/global.types";
import { profileKeyboard } from "../keyboards/profile.keyboard";

export const profile = async (ctx: CallbackQueryContext<IContext>) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from) return;

  await ctx.callbackQuery.message?.editText(
    `👤 *Ваш профіль*\n\n` + `Ім'я: ${ctx.from.first_name ?? "—"}\n`,
    {
      parse_mode: "Markdown",
      reply_markup: profileKeyboard,
    },
  );
};
