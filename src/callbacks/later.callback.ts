import { Context } from "grammy";
import { tmdbClient } from "../services/tmdb/tmdb.cleint";
import { TmdbMovie } from "../services/tmdb/tmdb.types";
import { getMovieTrailer } from "../services/tmdb/tmdb.service";
import { addMovieInteraction } from "../services/movie-interaction/movie-interaction.service";

export const laterCallback = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  if (!ctx.from) return;

  const tmdbId = parseInt(ctx.callbackQuery!.data!.split(":")[1]);

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
};
