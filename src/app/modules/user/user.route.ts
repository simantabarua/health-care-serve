import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../shared/fileUploader";
import { userValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-patient",
  fileUploader.upload.single("profilePhoto"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return UserController.cratePatient(req, res, next);
  }
);
router.get(
  "/users",
  (req: Request, res: Response, next: NextFunction) => {
    return UserController.getAllUser(req, res, next);
  }
);

export const UserRoutes = router;
