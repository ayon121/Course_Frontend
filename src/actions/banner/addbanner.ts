/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "../auth/tokenHandlers";

export const updateBannerServer = async (photos: { url: string; link?: string }[]) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }
        const response = await fetch(`http://localhost:5000/api/v1/banner/add`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
            body: JSON.stringify({ photos }),
        });

        const result = await response.json();
        return result;

    } catch (error: any) {
        console.log("updateBannerServer error:", error);
        return { success: false, message: "Failed to update banner" };
    }
};
