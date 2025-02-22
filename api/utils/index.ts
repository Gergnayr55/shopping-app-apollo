import jwt from "jsonwebtoken";

import config from "../config/config";
import bcrypt from "bcrypt";

const SECRET_KEY = config.ACCESS_SECRET;
const REFRESH_KEY = config.REFRESH_SECRET;
const SALT_ROUNDS = 10;

const { sign, verify } = jwt;
interface AccessUser {
  id: string;
}

interface RefreshUser {
  id: string;
  count: number;
}

// Checks for empty object
export const isMyObjectEmpty = (obj: any) => !Object.keys(obj).length;

// Sets the user's access and refresh tokens
export function setTokens(user: Record<string, any>) {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser: AccessUser = {
    id: user._id,
  };
  const accessToken = sign({ user: accessUser }, SECRET_KEY, {
    expiresIn: fifteenMins,
  });

  const refreshUser: RefreshUser = {
    id: user._id,
    count: user.tokenCount,
  };

  const refreshToken = sign({ user: refreshUser }, REFRESH_KEY, {
    expiresIn: sevenDays,
  });

  return { accessToken, refreshToken };
}

// Validate user access  jwt
export function validateAccessToken(token: string) {
  try {
    return verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

// Validate user refresh jwt
export function validateRefreshToken(token: string) {
  try {
    return verify(token, REFRESH_KEY);
  } catch {
    return null;
  }
}

// Returns cookies for jwt access and refresh tokens
export function tokenCookies({ accessToken, refreshToken }: any) {
  const cookieOptions = {
    httpOnly: true,
    // secure: true, //for HTTPS only
    //domain: "http://localhost:3000",
    //SameSite: "None",
  };

  return {
    access: ["access", accessToken, cookieOptions],
    refresh: ["refresh", refreshToken, cookieOptions],
  };
}

// Verify user jwt is still valid
export const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, SECRET_KEY);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Handle hashing password for user in db
export async function hashPassword(pw: string | Buffer) {
  try {
    const hash = await bcrypt.hash(pw, SALT_ROUNDS);
    return hash;
  } catch (e) {
    console.error(e);
  }
}

// Compares user's input pw with db's hashed pw value
export async function validateUserPw(pw: string | Buffer, hash: string) {
  try {
    const result = await bcrypt.compare(pw, hash);
    if (result === true) return true;
    else return false;
  } catch (e) {
    console.error(e);
  }
}

