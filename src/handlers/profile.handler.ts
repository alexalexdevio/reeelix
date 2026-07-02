import { CallbackQueryContext } from "grammy";
import { IContext } from "../types/global.types";
import { profileKeyboard } from "../keyboards/profile.keyboard";
import { getUserByTelegramId } from "../services/user/user.service";
import { backKeyboard } from "../keyboards/back.keyboard";

export const profile = async (ctx: CallbackQueryContext<IContext>) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from) return;

  const user = await getUserByTelegramId(ctx.from.id);

  if (!user)
    return ctx.callbackQuery.message?.editText(
      "Профіль не знайдено. Спробуйте /start.",
      {
        reply_markup: backKeyboard,
      },
    );

  await ctx.callbackQuery.message?.editText(
    `👤 *Ваш профіль*\n\n` +
    `Ім'я: ${user.firstname ?? "—"}\n` +
    `Username: ${user.username ? `@${user.username}` : "—"}\n` +
    `Дата реєстрації: ${user.createdAt.toLocaleDateString("uk-UA")}\n` +
    `Остання активність: ${user.lastActiveAt.toLocaleDateString("uk-UA")}`,
    {
      parse_mode: "Markdown",
      reply_markup: profileKeyboard,
    },
  );
};
