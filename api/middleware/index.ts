import { Request, Response, NextFunction } from "express";
const { validateAccessToken, validateRefreshToken } = require("../utils");
const { setTokens, tokenCookies } = require("../utils");
const { userRepo } = require("../dbconnection");

export async function validateTokensMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const refreshToken = req.cookies["refresh"];
  const accessToken = req.cookies["access"];

  if (!accessToken && !refreshToken) return next();
  const decodedAccessToken = validateAccessToken(accessToken);

  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);

  if (decodedRefreshToken && decodedRefreshToken.user) {
    const user = await userRepo.findOne({
      _id: decodedRefreshToken.user.id,
    });

    if (!user || user._id !== decodedRefreshToken.user.id) {
      //!user || user.data.tokenCount !== decodedRefreshToken.user.count
      res.clearCookie("access");
      res.clearCookie("refresh");
      return next();
    }
    const userTokens = setTokens(user.data);

    req.user = decodedRefreshToken.user;
    // update the cookies with new tokens
    const cookies = tokenCookies(userTokens);
    // @ts-ignore
    res.cookie(...cookies.access);
    // @ts-ignore
    res.cookie(...cookies.refresh);
    return next();
  }
  next();
}
