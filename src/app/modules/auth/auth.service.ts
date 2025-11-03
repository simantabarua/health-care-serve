import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../../config";
const login = async (payload: LoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new Error("User or Password is incorrect");
  } else {
    const isPasswordMatched = bcrypt.compareSync(
      payload.password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new Error("User or Password is incorrect");
    } else {
      const accessToken = await jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        config.jwt.jwt_secret as string,
        {
          algorithm: "HS256",
          expiresIn: "5h",
        }
      );
      const refreshToken = await jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        config.jwt.jwt_secret as string,
        {
          algorithm: "HS256",
          expiresIn: "7d",
        }
      );
      return {
        accessToken,
        refreshToken,
        newUser: user.needPasswordChange,
      };
    }
  }
};

export const AuthService = {
  login,
};
