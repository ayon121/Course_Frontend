"use server";

import { cookies } from "next/headers";


/**
 * Set a secure cookie (Access / Refresh Token)
 */
export async function setCookie(
    name: string,
    value: string,
    options: {
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
        path?: string;
        maxAge?: number;
    } = {}
) {
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
        httpOnly: options.httpOnly ?? true,
        secure: options.secure ?? true,
        sameSite: options.sameSite ?? "strict",
        path: options.path ?? "/",
        maxAge: options.maxAge ?? 60 * 60,
    });
}

/**
 * Get a cookie value (Server Only)
 */
export const getCookie = async (key: string): Promise<string | null> => {
    const store = await cookies();
    return store.get(key)?.value || null;
};

/**
 * Delete a cookie
 */
export const deleteCookie = async (key: string) => {
    const store = await cookies();
    store.delete(key);
};
