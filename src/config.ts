import "dotenv/config";

function enviroment(key: string): string {
  const value = process.env[key];

  if (!value) throw new Error(`Missing required velue ${key}.`);

  return value;
}

export const config = {
  telegram: {
    botKey: enviroment("BOT_API_KEY"),
  },
  tmdb: {
    apiToken: enviroment("TMDB_ACCESS_API_KEY"),
    baseUrl: "https://api.themoviedb.org/3",
    imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  },
  mongo: {
    uri: enviroment("MONGO_URI"),
  },
};
