declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      API_PORT: number;
      API_URL: string;
      CLIENT_URL: string;
      MONGO_URI: string;
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
    }
  }
}

export {};
