import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../shared/fileUploader";
import { Request } from "express";
import { UserRole, UserStatus } from "@prisma/client";

const cratePatient = async (req: Request) => {
  const hashPassword = bcrypt.hashSync(
    req.body.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
  if (req.file) {
    const profilePhoto = await fileUploader.uploadToCloudinary(req.file!);
    req.body.patient.profilePhoto = profilePhoto?.secure_url;
  }
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        password: hashPassword,
        email: req.body.patient.email,
      },
    });
    return await tx.patient.create({
      data: req.body.patient,
    });
  });
  return {
    ...result,
    password: undefined,
  };
};

const getAllUser = async (params: any, filters: any) => {
  const { page, limit, sortBY, sortOrder } = params;
  const { searchTerm, role, status } = filters;
  const skip = (page - 1) * limit;
  const result = await prisma.user.findMany({
    skip: skip,
    take: limit,
    where: {
      email: {
        contains: searchTerm,
        mode: "insensitive",
      },
      role: role,
      status: status,
    },
    orderBy: sortBY ? { [sortBY]: sortOrder } : { createdAt: "desc" },
  });
  return result;
};

export const UserService = {
  cratePatient,
  getAllUser,
};
