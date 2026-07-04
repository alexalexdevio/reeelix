import { InlineKeyboard } from "grammy";

export const movieKeyboard = (tmdbId: number): InlineKeyboard => {
  return new InlineKeyboard()
    .text("❤️ В улюблені", `fav:${tmdbId}`)
    .text("🕐 Пізніше", `later:${tmdbId}`)
    .row()
    .text("🎬 Ще фільм", "random_movie")
    .row()
    .text("⬅️ Назад", "back_out_list");
};
