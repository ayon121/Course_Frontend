"use server";

import { getCookie } from "../auth/tokenHandlers";



export const getAllCoursesPublic = async (
  page: number = 1,
  searchTerm: string = ""
) => {
  const accessToken = await getCookie("accessToken");

  const query = new URLSearchParams({
    page: page.toString(),
    limit: "6",
    searchTerm,
  });

  const res = await fetch(
    `http://localhost:5000/api/v1/course/public/all?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accesstoken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch courses");

  const data = await res.json();
  return data; 
};
