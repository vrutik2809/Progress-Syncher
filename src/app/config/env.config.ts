import dotenv from "dotenv";

dotenv.config();

interface ENV {
  NODE_ENV: string | undefined;
  DB_URL: string | undefined;
}

interface Config {
  NODE_ENV: string;
  DB_URL: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL
  };
};

const getResolvedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const resolvedConfig = getResolvedConfig(config);

export default resolvedConfig;