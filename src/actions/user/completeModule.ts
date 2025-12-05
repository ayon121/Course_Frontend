/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "@/actions/auth/tokenHandlers";

export const completeModule = async (
  courseId: string,
  moduleId: string
): Promise<any> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const res = await fetch(
      `http://localhost:5000/api/v1/user/course/complete-module`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accesstoken=${accessToken}`,
        },
        body: JSON.stringify({ courseId, moduleId }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to complete module",
      };
    }

    return {
      success: true,
      progress: result.progress,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
