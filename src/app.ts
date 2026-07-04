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

bot.callbackQuery("profile", profile);
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
