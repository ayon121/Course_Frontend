/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getCookie } from "../auth/tokenHandlers";
import { redirect } from "next/navigation";

export interface CreateCoursePayload {
    banner: string;
    title: string;
    description: string;
    duration: string;
    instructor: string;
    price: number;
    discountedPrice: number;
    modules: {
        title: string;
        videoLink: string;
        isPublic: boolean;
        rank: number;
    }[];
}

export const createCourse = async (payload: CreateCoursePayload) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        const response = await fetch(`http://localhost:5000/api/v1/course/addcourse`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create course");
        }

        const data = await response.json();
        if (data.success !== true) {
            throw new Error(data.message || "Failed to create course");
        }
        redirect("/0213A/admin/allcourse?courseCreated=true");

    } catch (error: any) {
        // Allow NEXT_REDIRECT to escape
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create course",
        };
    }
};


