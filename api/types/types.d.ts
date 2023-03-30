export {};

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}
