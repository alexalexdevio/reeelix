import Logger from "@ptkdev/logger";
import { Bot, GrammyError, HttpError } from "grammy";
import { IContext } from "./types/global.types";
import { hydrate } from "@grammyjs/hydrate";
import {
  backToMainHandler,
  backToMainHandlerFromMovieList,
  confirmDeleteProfile,
  deleteProfile,
  help,
  profile,
  randomMovie,
  start,
  unknown,
} from "./handlers";
import { config } from "./config";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection";
import { ensureUserMiddleware } from "./middlewares/ensure-user";

/** @TODO: Refactor handlers to chek where is callbacks */
import {
  favCallback,
  favoriteMovieInfoCallback,
  favoritesCallback,
  laterCallback,
  removeFavoriteCallback,
  removeWatchlistCallback,
  watchlistCallback,
  watchlistMovieInfoCallback,
} from "./callbacks";

const bot = new Bot<IContext>(config.telegram.botKey);
const logger = new Logger();

bot.use(hydrate());
bot.use(ensureUserMiddleware);

bot.api.setMyCommands([
  {
    command: "start",
    description: "Запуск бота.",
  },
  {
    command: "help",
    description: "Допомога з користуванням.",
  },
]);

bot.command("start", start);

bot.command("help", help);

bot.callbackQuery("random_movie", randomMovie);
bot.callbackQuery(/^fav:(\d+)$/, async (ctx) => {
  logger.info("[bot] fav callback triggered:", ctx.callbackQuery.data);
  await favCallback(ctx);
});
bot.callbackQuery(/^later:(\d+)$/, async (ctx) => {
  logger.info("[bot] later callback triggered:", ctx.callbackQuery.data);
  await laterCallback(ctx);
});

bot.callbackQuery("profile", profile);

bot.callbackQuery("favorites", favoritesCallback);
bot.callbackQuery("watchlist", watchlistCallback);

bot.callbackQuery(/^movie_info:favorite:(\d+)$/, favoriteMovieInfoCallback);
bot.callbackQuery(/^movie_info:watchlist:(\d+)$/, watchlistMovieInfoCallback);

bot.callbackQuery(/^remove:favorite:(\d+)$/, removeFavoriteCallback);
bot.callbackQuery(/^remove:watchlist:(\d+)$/, removeWatchlistCallback);

bot.callbackQuery("delete_profile", deleteProfile);
bot.callbackQuery("confirm_delete", confirmDeleteProfile);

bot.callbackQuery("back_to_main", backToMainHandler);
bot.callbackQuery("back_out_list", backToMainHandlerFromMovieList);

bot.on("message:text", unknown);

/**
 * Grammy errors handling
 */
bot.catch((err) => {
  const ctx = err.ctx;
  logger.error(`Error while handling update ${ctx.update.update_id}`);

  const e = err.error;

  if (e instanceof GrammyError)
    logger.error(`Error in request: ${e.description}`);
  if (e instanceof HttpError) logger.error(`Could't contact Telegram: ${e}`);
  logger.error(`Unknown error: ${e}`);
});

/**
 * @function running a bot
 */

async function main() {
  try {
    connectToDatabase();
    bot.start();
    logger.info("✅ Bot app has been started.");
  } catch (error) {
    logger.error(`❌ Error in running BOT: ${error}`);
  }
}

main();

process.once("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

process.once("SIGTERM", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});
