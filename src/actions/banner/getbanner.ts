/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getBannerServer = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/banner/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log("getBannerServer error:", error);
        return { success: false, message: "Failed to fetch banner" };
    }
};
