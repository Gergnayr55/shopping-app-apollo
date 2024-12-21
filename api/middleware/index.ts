import { Request, Response, NextFunction } from "express";
import { validateAccessToken, validateRefreshToken } from "../utils"
import { setTokens, tokenCookies } from "../utils"
import { userRepo } from "../dbconnection";
import { JwtPayload } from "jsonwebtoken";
interface MyToken extends JwtPayload {
  user?: any;
}

export async function validateTokensMiddleware(
  req: any,
  res: any,
  next: any
): Promise<void> {
  const refreshToken = req.cookies["refresh"];
  const accessToken = req.cookies["access"];

  if (!accessToken && !refreshToken) return next();
  const decodedAccessToken: MyToken | string | null = validateAccessToken(accessToken);

  if (decodedAccessToken && typeof decodedAccessToken !== 'string' && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken: MyToken | string | null = validateRefreshToken(refreshToken);

  if (decodedRefreshToken &&  typeof decodedRefreshToken !== 'string' && decodedRefreshToken.user) {
    const user = await userRepo.findOne({
      _id: decodedRefreshToken.user.id,
    });

    if (!user || user._id !== decodedRefreshToken.user.id) {
      res.clearCookie("access");
      res.clearCookie("refresh");
      return next();
    }
    const userTokens = setTokens(user);

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
