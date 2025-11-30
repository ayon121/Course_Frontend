"use server";

import { getCookie } from "../auth/tokenHandlers";


export const deleteCourseServer = async (courseId: string) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            return { success: false, message: "Unauthorized" };
        }

        const response = await fetch(`http://localhost:5000/api/v1/course/deletecourse/${courseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
        });

        const result = await response.json();
        return result; // { success: true | false, message: "" }
    } catch (error) {
        console.error("Course delete failed:", error);

        return {
            success: false,
            message: "Failed to delete course",
        };
    }
};
