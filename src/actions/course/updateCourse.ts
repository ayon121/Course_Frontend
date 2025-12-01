/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "../auth/tokenHandlers";

export const updateCourseServer = async (id: string, payload: any) => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`http://localhost:5000/api/v1/course/updatecourse/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accesstoken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to update course" };
  }
};
