import { z } from "zod";
const createPatientZodSchema = z.object({
  password: z.string().min(6),
  patient: z.object({
    name: z.string({
      error: "Name is required",
    }),
    email: z.email({
      error: "Email is required",
    }),
    address: z.string().optional(),
  }),
});
export const userValidation = {
  createPatientZodSchema,
};
