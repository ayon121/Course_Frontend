/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "../auth/tokenHandlers";

export const getMySinglePurchasedCourse = async (courseId: string) => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
        data: null,
      };
    }

    const response = await fetch(
      `http://localhost:5000/api/v1/user/course/purchased/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accesstoken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.success === false) {
      return {
        success: false,
        message: result.message || "Failed to fetch course",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data, // full user-course + course.modules
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch course",
      data: null,
    };
  }
};
