import { Context, InlineKeyboard } from "grammy";
import {
  getUserInteractions,
  removeMovieInteraction,
} from "../services/movie-interaction/movie-interaction.service";

export const watchlistCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from) return;

  const watchlist = await getUserInteractions(ctx.from.id, "watchlist");

  if (!watchlist.length) {
    const keyboard = new InlineKeyboard().text("⬅️ Назад", "profile");
    return ctx.editMessageText(
      "🕐 *Переглянути пізніше*\n\nСписок порожній. Додайте фільми натиснувши 🕐 під карткою фільму.",
      { parse_mode: "Markdown", reply_markup: keyboard },
    );
  }

  const keyboard = new InlineKeyboard();

  watchlist.forEach((item, index) => {
    keyboard
      .text(
        `${index + 1}. ${item.movieSnapshot.title} (${item.movieSnapshot.year})`,
        `movie_info:watchlist:${item.tmdbId}`,
      )
      .row();
  });

  keyboard.text("⬅️ Назад", "profile");

  await ctx.editMessageText(
    `🕐 *Переглянути пізніше* (${watchlist.length}/5)\n\nОберіть фільм щоб дізнатись більше або видалити зі списку:`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    },
  );
};

export const watchlistMovieInfoCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from || !ctx.callbackQuery?.data) return;

  const [, type, tmdbIdStr] = ctx.callbackQuery.data.split(":");
  const tmdbId = parseInt(tmdbIdStr);

  const watchlist = await getUserInteractions(ctx.from.id, "watchlist");

  const item = watchlist.find((f) => f.tmdbId === tmdbId);

  if (!item) {
    return ctx.editMessageText("❌ Фільм не знайдено", {
      reply_markup: new InlineKeyboard().text("⬅️ Назад", "watchlist"),
    });
  }

  const keyboard = new InlineKeyboard()
    .text("🗑 Видалити", `remove:watchlist:${tmdbId}`)
    .row()
    .text("⬅️ Назад", "favorites");

  await ctx.editMessageText(
    `🎬 *${item.movieSnapshot.title}* (${item.movieSnapshot.year})\n` +
    `⭐ ${item.movieSnapshot.rating.toFixed(1)} / 10\n\n` +
    (item.movieSnapshot.trailerUrl
      ? `▶️ [Дивитись трейлер](${item.movieSnapshot.trailerUrl})`
      : ""),
    { parse_mode: "Markdown", reply_markup: keyboard },
  );
};

export const removeWatchlistCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from || !ctx.callbackQuery?.data) return;

  const [, , tmdbIdStr] = ctx.callbackQuery.data.split(":");
  const tmdbId = parseInt(tmdbIdStr);

  await removeMovieInteraction(ctx.from.id, tmdbId, "watchlist");

  const watchlist = await getUserInteractions(ctx.from.id, "watchlist");

  if (!watchlist.length) {
    const keyboard = new InlineKeyboard().text("⬅️ Назад", "profile");
    return ctx.editMessageText(
      "🕐 *Переглянути пізніше*\n\nСписок порожній. Додайте фільми натиснувши 🕐 під карткою фільму.",
      { parse_mode: "Markdown", reply_markup: keyboard },
    );
  }

  const keyboard = new InlineKeyboard();

  watchlist.forEach((item, index) => {
    keyboard
      .text(
        `${index + 1}. ${item.movieSnapshot.title} (${item.movieSnapshot.year})`,
        `movie_info:watchlist:${item.tmdbId}`,
      )
      .row();
  });

  keyboard.text("⬅️ Назад", "profile");

  await ctx.editMessageText(
    `🕐 *Переглянути пізніше* (${watchlist.length}/5)\n\nОберіть фільм щоб дізнатись більше або видалити зі списку:`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    },
  );
};
