/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const addEventServer = async (eventData: any) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    return result; // { success, data }
  } catch (error: any) {
    console.error("addEventServer error:", error);
    return { success: false, data: null, message: "Failed to add event" };
  }
};
