import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

const cratePatient = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.cratePatient(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient created successfully",
    data: user,
  });
});

export const UserController = {
  cratePatient,
};
