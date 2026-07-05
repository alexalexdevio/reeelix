import { Context, InlineKeyboard } from "grammy";
import {
  getUserInteractions,
  removeMovieInteraction,
} from "../services/movie-interaction/movie-interaction.service";

export const favoritesCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from) return;

  const favorites = await getUserInteractions(ctx.from.id, "favorite");

  if (!favorites.length) {
    const keyboard = new InlineKeyboard().text("⬅️ Назад", "profile");
    return ctx.editMessageText(
      "❤️ *Улюблені фільми*\n\nСписок порожній. Додайте фільми натиснувши ❤️ під карткою фільму.",
      { parse_mode: "Markdown", reply_markup: keyboard },
    );
  }

  const keyboard = new InlineKeyboard();

  favorites.forEach((item, index) => {
    keyboard
      .text(
        `${index + 1}. ${item.movieSnapshot.title} (${item.movieSnapshot.year})`,
        `movie_info:favorite:${item.tmdbId}`,
      )
      .row();
  });

  keyboard.text("⬅️ Назад", "profile");

  await ctx.editMessageText(
    `❤️ *Улюблені фільми* (${favorites.length}/5)\n\nОберіть фільм щоб дізнатись більше або видалити зі списку:`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    },
  );
};

export const favoriteMovieInfoCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from || !ctx.callbackQuery?.data) return;

  const [, type, tmdbIdStr] = ctx.callbackQuery.data.split(":");
  const tmdbId = parseInt(tmdbIdStr);

  const favorites = await getUserInteractions(ctx.from.id, "favorite");

  const item = favorites.find((f) => f.tmdbId === tmdbId);

  if (!item) {
    return ctx.editMessageText("❌ Фільм не знайдено", {
      reply_markup: new InlineKeyboard().text("⬅️ Назад", "favorites"),
    });
  }

  const keyboard = new InlineKeyboard()
    .text("🗑 Видалити", `remove:favorite:${tmdbId}`)
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

export const removeFavoriteCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from || !ctx.callbackQuery?.data) return;

  const [, , tmdbIdStr] = ctx.callbackQuery.data.split(":");
  const tmdbId = parseInt(tmdbIdStr);

  await removeMovieInteraction(ctx.from.id, tmdbId, "favorite");

  const favorites = await getUserInteractions(ctx.from.id, "favorite");

  if (!favorites.length) {
    const keyboard = new InlineKeyboard().text("⬅️ Назад", "profile");
    return ctx.editMessageText(
      "❤️ *Улюблені фільми*\n\nСписок порожній. Додайте фільми натиснувши ❤️ під карткою фільму.",
      { parse_mode: "Markdown", reply_markup: keyboard },
    );
  }

  const keyboard = new InlineKeyboard();

  favorites.forEach((item, index) => {
    keyboard
      .text(
        `${index + 1}. ${item.movieSnapshot.title} (${item.movieSnapshot.year})`,
        `movie_info:favorite:${item.tmdbId}`,
      )
      .row();
  });

  keyboard.text("⬅️ Назад", "profile");

  await ctx.editMessageText(
    `❤️ *Улюблені фільми* (${favorites.length}/5)\n\nОберіть фільм щоб дізнатись більше або видалити зі списку:`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    },
  );
};
