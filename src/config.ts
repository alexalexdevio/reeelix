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
  mongo: {
    uri: enviroment("MONGO_URI"),
  },
};
