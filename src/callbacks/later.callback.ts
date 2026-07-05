import { Context } from "grammy";
import { tmdbClient } from "../services/tmdb/tmdb.cleint";
import { TmdbMovie } from "../services/tmdb/tmdb.types";
import { getMovieTrailer } from "../services/tmdb/tmdb.service";
import { addMovieInteraction } from "../services/movie-interaction/movie-interaction.service";
import Logger from "@ptkdev/logger";

const logger = new Logger();

export const laterCallback = async (ctx: Context) => {
  if (!ctx.from || !ctx.callbackQuery?.data) return;

  const tmdbId = parseInt(ctx.callbackQuery.data.split(":")[1]);

  if (isNaN(tmdbId))
    return ctx.answerCallbackQuery({ text: `❌ Помилка, спробуйте ще раз` });

  try {
    const { data: movie } = await tmdbClient.get<TmdbMovie>(`/movie/${tmdbId}`);
    const trailerUrl = await getMovieTrailer(tmdbId);

    const result = await addMovieInteraction(ctx.from.id, tmdbId, "watchlist", {
      title: movie.title,
      posterPath: movie.poster_path,
      rating: movie.vote_average,
      year: movie.release_date?.split("–")[0] ?? "–",
      trailerUrl,
    });

    const message: Record<typeof result, string> = {
      added: `🕐 Додано до списку перегляду!`,
      already_exists: `Цей фільм вже є у списку перегляду`,
      limit_reached: `❌ Ліміт улюблених — ${5} фільмів. Видаліть один щоб додати новий.`,
    };

    await ctx.answerCallbackQuery({
      text: message[result],
      show_alert: result !== "added",
    });
  } catch (error) {
    logger.error(`"[laterCallback] error: ${error}`);
    await ctx.answerCallbackQuery({
      text: `❌ Щось пішло не так`,
      show_alert: true,
    });
  }
};
