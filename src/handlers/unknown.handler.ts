import { IContext } from "../types/global.types";

export const unknown = async (ctx: IContext) => {
  await ctx.reply(
    `Невідома команда. Подивіться меню команд та за потребою скористайтесь командою /help.`,
  );
};
