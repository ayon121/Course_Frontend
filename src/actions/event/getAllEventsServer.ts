/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllEventsServer = async (query: Record<string, string> = {}) => {
  try {
    const params = new URLSearchParams(query).toString();
    const response = await fetch(`http://localhost:5000/api/v1/event?${params}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const result = await response.json();
    return result; // { success, data, meta }
  } catch (error: any) {
    console.error("getAllEventsServer error:", error);
    return { success: false, data: [], meta: {}, message: "Failed to fetch events" };
  }
};
