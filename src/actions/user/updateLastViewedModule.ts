/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "../auth/tokenHandlers";
import { serverFetch } from "@/lib/serverFetch";

export const updateLastViewedModule = async (
  courseId: string,
  moduleId: string
): Promise<any> => {
  try {
    // 🔐 Get access token from cookies
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    // 🌐 Call backend API
    const res = await serverFetch.patch("/user/course/update-last-viewed", {
      body: JSON.stringify({ courseId, moduleId }),
      headers: {
        "Content-Type": "application/json",
        Cookie: `accesstoken=${accessToken}`,
      },
    });

    const result = await res.json();

    if (!res.ok || result.success === false) {
      return {
        success: false,
        message: result.message || "Failed to update last viewed module",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update last viewed module",
    };
  }
};
