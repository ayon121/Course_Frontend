/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getCookie } from "../auth/tokenHandlers";

export const getAllCoursesAdmin = async () => {
    try {
        const accessToken = await getCookie("accessToken");
        if (!accessToken) {
            throw new Error("User not authenticated");
        }
        const response = await fetch(`http://localhost:5000/api/v1/course/allcourseadmin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
            cache: "no-store",
        });
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.log("Error fetching courses:", error);
        return [];
    }
};


export const getCourseDetailsServer = async (courseId: string) => {
    const accessToken = await getCookie("accessToken");
    const res = await fetch(`http://localhost:5000/api/v1/course/${courseId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accesstoken=${accessToken}`,
        },
    });
    if (!res.ok) throw new Error("Failed to fetch course");
    const data = await res.json();
    return data.data;
};

export const toggleCoursePublishServer = async (courseId: string, publish: boolean) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        const response = await fetch(`http://localhost:5000/api/v1/course/updatepublish/${courseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
            body: JSON.stringify({ isPublished: publish }),
        });

        const data = await response.json();

        if (!response.ok || data.success !== true) {
            throw new Error(data.message || "Failed to update publish status");
        }

        return { success: true, message: data.message || "Publish status updated" };
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to update publish status",
        };
    }
};