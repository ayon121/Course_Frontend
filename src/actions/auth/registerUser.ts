/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { setCookie } from "./tokenHandlers";



export const registerUser = async (_prevState: any, formData: FormData) => {
    try {
        // Extract payload
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // Validate input data
        const parsed = registerValidationZodSchema.safeParse(payload);

        if (!parsed.success) {
            return {
                success: false,
                message: "Validation failed",
                errors: parsed.error.flatten().fieldErrors,
            };
        }


        const response = await fetch("http://localhost:5000/api/v1/user/register", {
            method: "POST",
            body: JSON.stringify(parsed.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (result.success !== true) {
            return {
                success: false,
                message: result.message || "Registration failed",
                errors: result.error || null,
            };
        }

        //  Set Auth Cookies (if backend returns tokens)
        if (result?.data?.accesstoken) {
            await setCookie("accessToken", result.data.accesstoken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60, // 1 hour
            });
        }

        if (result?.data?.refreshtoken) {
            await setCookie("refreshToken", result.data.refreshtoken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        //  Redirect after registration success
        redirect("/?accountCreated=true");

    } catch (error: any) {
        // Allow NEXT_REDIRECT to escape
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong while creating your account.",
        };
    }
};
