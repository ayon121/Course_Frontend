/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { zodValidator } from "@/zod/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { serverFetch } from "@/lib/serverFetch";
import { setCookie } from "./tokenHandlers";

export const loginUser = async (_: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get("redirect") || null;

        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // 🔍 Validate
        const validated = zodValidator(payload, loginValidationZodSchema);
        if (!validated.success) return validated;

        // 🔥 Send login request
        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validated.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        console.log(result);
        if (!res.ok) {
            return { success: false, message: result.message || "Login failed" };
        } 

        
        const accessToken = result.data?.accesstoken;
        const refreshToken = result.data?.refreshtoken;

        if (!accessToken || !refreshToken) {
            return { success: false, message: "Token missing from server response" };
        }


        // Set cookies inside Next.js
        await setCookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });

        await setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        // 🔎 Decode user role
        const verified = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        const role = verified.role;

        // 🔁 Final Redirect
        const defaultDashboard =
            role === "SUPER_ADMIN"
                ? "/0213A/admin"
                : "/dashboard";

        redirect(redirectTo ? `${redirectTo}?loggedIn=true` : `${defaultDashboard}?loggedIn=true`);

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Invalid login credentials",
        };
    }
};
