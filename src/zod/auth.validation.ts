import { z } from "zod";

export const loginValidationZodSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
});
export const registerValidationZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 chars"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
});