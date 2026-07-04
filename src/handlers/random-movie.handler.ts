import { Context } from "grammy";
import {
  buildPoster,
  formatMovieCaption,
  getMovieTrailer,
  getRandomMovie,
} from "../services/tmdb/tmdb.service";
import { movieKeyboard } from "../keyboards/movie.keyboard";

export const randomMovie = async (ctx: Context) => {
  await ctx.answerCallbackQuery();

  const movie = await getRandomMovie();
  if (!movie) return ctx.reply("Не вдалось знайти фільм, спробуйте ще раз 🎬");

  const [trailerUrl, posterUrl] = await Promise.all([
    getMovieTrailer(movie.id),
    Promise.resolve(buildPoster(movie.poster_path)),
  ]);

  const caption = formatMovieCaption(movie, trailerUrl);
  const keyboard = movieKeyboard(movie.id);

  if (posterUrl) {
    await ctx.replyWithPhoto(posterUrl, {
      caption,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });
  } else {
    await ctx.reply(caption, {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });
  }
};
