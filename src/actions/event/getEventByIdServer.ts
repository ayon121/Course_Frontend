/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getEventByIdServer = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/event/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const result = await response.json();
    return result; // { success, data }
  } catch (error: any) {
    console.error("getEventByIdServer error:", error);
    return { success: false, data: null, message: "Failed to fetch event" };
  }
};
