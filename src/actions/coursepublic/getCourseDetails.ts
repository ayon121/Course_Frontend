// 👉 GET Public Course Details (No Auth Required)
export const getPublicCourseDetailsServer = async (courseId: string) => {
    const res = await fetch(`http://localhost:5000/api/v1/course/public/${courseId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch course");

    const data = await res.json();
    return data.data; 
};
