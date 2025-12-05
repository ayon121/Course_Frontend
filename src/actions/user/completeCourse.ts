/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "@/actions/auth/tokenHandlers";

export const completeCourse = async (courseId: string): Promise<any> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const res = await fetch(
      `http://localhost:5000/api/v1/user/course/complete-course`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accesstoken=${accessToken}`,
        },
        body: JSON.stringify({ courseId }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to complete course",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unable to complete course",
    };
  }
};
