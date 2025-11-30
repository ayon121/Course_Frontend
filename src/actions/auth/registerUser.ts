/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { zodValidator } from "@/zod/zodValidator";

import { serverFetch } from "@/lib/serverFetch";
import { setCookie } from "./tokenHandlers";
import { registerValidationZodSchema } from "@/zod/auth.validation";


export const registerUser = async (_: any, formData: FormData) => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // Validate input using Zod
        const validated = zodValidator(payload, registerValidationZodSchema);
        if (!validated.success) return validated;

        // Call backend API
        const res = await serverFetch.post("/auth/register", {
            body: JSON.stringify(validated.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Registration failed",
            };
        }

        // If backend returns tokens after registration
        const accessToken = result.data?.accesstoken;
        const refreshToken = result.data?.refreshtoken;

        if (accessToken) {
            await setCookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60, // 1 hour
            });
        }

        if (refreshToken) {
            await setCookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        // Redirect user after registration
        redirect("/dashboard");

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Unable to create account",
        };
    }
};
