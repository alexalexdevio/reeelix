import { Schema, model } from "mongoose";
import { IMovieInteraction } from "../../services/movie-interaction/movie-interaction.types";

const movieInteractionSchema = new Schema<IMovieInteraction>({
  userId: { type: Number, required: true },
  tmdbId: { type: Number, required: true },
  type: { type: String, enum: ["favorite", "watchlist"], required: true },
  movieSnapshot: {
    title: { type: String, required: true },
    posterPath: { type: String, default: null },
    rating: { type: Number, required: true },
    year: { type: String, required: true },
    trailerUrl: { type: String, default: null },
  },
  addedAt: { type: Date, default: Date.now },
});

/**
 * @description Prevents duplicate movie entries within the same category for a user.
 */

movieInteractionSchema.index(
  { userId: 1, tmdbId: 1, type: 1 },
  { unique: true },
);

export const MovieInteractionModel = model<IMovieInteraction>(
  "MovieInteraction",
  movieInteractionSchema,
);
