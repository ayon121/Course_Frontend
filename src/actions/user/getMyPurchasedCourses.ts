/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "../auth/tokenHandlers";



export const getMyPurchasedCourses = async () => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
        data: [],
      };
    }

    const response = await fetch(
      "http://localhost:5000/api/v1/user/mycourses",
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
        message: result.message || "Failed to fetch purchased courses",
        data: [],
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
          : "Failed to fetch purchased courses",
      data: [],
    };
  }
};
