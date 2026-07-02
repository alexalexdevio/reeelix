import { InlineKeyboard } from "grammy";

export const profileKeyboard = new InlineKeyboard()
  .text("❤️ Улюблені", "favorites")
  .text("🕐 Переглянути пізніше", "watchlist")
  .row()
  .text("❌ Видалити профіль", "delete_profile")
  .row()
  .text("⬅️ Назад", "back_to_main");
