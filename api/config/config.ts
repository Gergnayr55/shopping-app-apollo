import * as dotenv from "dotenv";
// Parsing the env file.
dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  API_PORT: number | undefined;
  API_URL: string | undefined;
  CLIENT_URL: string | undefined;
  MONGO_URI: string | undefined;
  ACCESS_SECRET: string | undefined;
  REFRESH_SECRET: string | undefined;
}

interface Config {
  NODE_ENV: string;
  API_PORT: number;
  API_URL: string;
  CLIENT_URL: string;
  MONGO_URI: string;
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    API_PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const myConfig = getConfig();

const config = getSanitizedConfig(myConfig);

export default config;
