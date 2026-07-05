import { Document } from "mongoose";

export type AddResult = "added" | "already_exists" | "limit_reached";

export type InteractionType = "favorite" | "watchlist";

export interface IMovieInteraction extends Document {
  userId: number;
  tmdbId: number;
  type: InteractionType;
  movieSnapshot: {
    title: string;
    posterPath: string | null;
    rating: number;
    year: string;
    trailerUrl: string | null;
  };
  addedAt: Date;
}
