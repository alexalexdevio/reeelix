import { config } from "../../config";
import { tmdbClient } from "./tmdb.cleint";
import {
  TmdbDiscoveryResponse,
  TmdbMovie,
  TmdbVideosResponse,
} from "./tmdb.types";

const MAX_PAGE = 500;

export const getRandomMovie = async (): Promise<TmdbMovie | null> => {
  const randomPage = Math.floor(Math.random() * MAX_PAGE) + 1;

  const { data } = await tmdbClient.get<TmdbDiscoveryResponse>(
    `/discover/movie`,
    {
      params: {
        sort_by: "popularity.decs",
        page: randomPage,
        "vote_count.gte": 100,
        include_adult: false,
      },
    },
  );

  if (!data.results.length) return null;

  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
};

export const getMovieTrailer = async (
  movieId: number,
): Promise<string | null> => {
  const { data } = await tmdbClient.get<TmdbVideosResponse>(
    `/movie/${movieId}/videos`,
  );

  const trailer = data.results.find(
    (t) => t.site === "YouTube" && t.type === "Trainer" && t.official,
  );

  const fallback = data.results.find(
    (t) => t.site === "YouTube" && t.type === "Trailer",
  );
  const video = trailer ?? fallback ?? null;
  return video ? `https://www.youtube.com/watch?v=${video.key}` : null;
};

export const buildPoster = (posterPath: string | null): string | null => {
  if (!posterPath) return null;

  return `${config.tmdb.imageBaseUrl}${posterPath}`;
};

export const formatMovieCaption = (
  movie: TmdbMovie,
  trailerUrl: string | null,
): string => {
  const year = movie.release_date?.split("-")[0] ?? "–";
  const rating = movie.vote_average.toFixed(1);

  return (
    `🎬 *${movie.title}* (${year})\n` +
    `⭐ ${rating} / 10 (${movie.vote_count} оцінок)\n\n` +
    `${movie.overview || "Опис відсутній"}\n\n` +
    (trailerUrl ? `▶️ [Дивитись трейлер](${trailerUrl})` : "")
  );
};
