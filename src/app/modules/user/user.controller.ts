import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import { UserRole, UserStatus } from "@prisma/client";
import pick from "../../shared/pick";

const cratePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.cratePatient(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["limit", "page", "sortBY", "sortOrder"]);
  const filters = pick(req.query, ["searchTerm", "role", "status"]);
  const result = await UserService.getAllUser( options, filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});
export const UserController = {
  cratePatient,
  getAllUser,
};
