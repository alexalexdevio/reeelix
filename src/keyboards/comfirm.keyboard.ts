import { InlineKeyboard } from "grammy";

export const comfirmKeyboard = new InlineKeyboard()
  .text("✅ Так, видалити", "confirm_delete")
  .text("❌ Скасувати", "profile");
