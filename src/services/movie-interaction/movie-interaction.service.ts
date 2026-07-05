import { MovieInteractionModel } from "../../db/models/MovieInteraction.model";
import {
  AddResult,
  IMovieInteraction,
  InteractionType,
} from "./movie-interaction.types";

const LIMIT = 5;

export const addMovieInteraction = async (
  userId: number,
  tmdbId: number,
  type: InteractionType,
  snapshot: IMovieInteraction["movieSnapshot"],
): Promise<AddResult> => {
  /**
   * @description check if movie exists */
  const existing = await MovieInteractionModel.findOne({
    userId,
    tmdbId,
    type,
  });
  if (existing) return "already_exists";

  /**
   * @descripton count limit */
  const count = await MovieInteractionModel.countDocuments({ userId, type });
  if (count >= LIMIT) return "limit_reached";

  await MovieInteractionModel.create({
    userId,
    tmdbId,
    type,
    movieSnapshot: snapshot,
  });
  return "added";
};

export const getUserInteractions = async (
  userId: number,
  type: InteractionType,
): Promise<IMovieInteraction[]> => {
  return MovieInteractionModel.find({ userId, type }).sort({ addedAt: -1 });
};

export const removeMovieInteraction = async (
  userId: number,
  tmdbId: number,
  type: InteractionType,
): Promise<void> => {
  await MovieInteractionModel.deleteOne({ userId, tmdbId, type });
};

export const removeAllUserInteractions = async (
  userId: number,
): Promise<void> => {
  await MovieInteractionModel.deleteMany({ userId });
};
