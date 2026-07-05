import { CallbackQueryContext, Context } from "grammy";
import { IContext } from "../types/global.types";
import { comfirmKeyboard } from "../keyboards/comfirm.keyboard";
import { deleteUser } from "../services/user/user.service";
import { removeAllUserInteractions } from "../services/movie-interaction/movie-interaction.service";

export const deleteProfile = async (ctx: CallbackQueryContext<IContext>) => {
  await ctx.answerCallbackQuery();

  await ctx.callbackQuery.message?.editText(
    `⚠️ *Ви впевнені?*\n\n` +
    `Ваш профіль, улюблені фільми та список "Переглянути пізніше" будуть *назавжди видалені*.\n\n` +
    `Цю дію неможливо скасувати.`,
    {
      parse_mode: "Markdown",
      reply_markup: comfirmKeyboard,
    },
  );
};

export const confirmDeleteProfile = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from) return;

  await Promise.all([
    deleteUser(ctx.from.id),
    removeAllUserInteractions(ctx.from.id),
  ]);

  await ctx.deleteMessage();

  const comeback = await ctx.reply(
    `👋 Ваш профіль видалено.\n\nЯкщо захочете повернутись — просто натисніть /start`,
  );

  setTimeout(async () => {
    await ctx.api.deleteMessage(ctx.chat!.id, comeback.message_id);
  }, 3000);
};
