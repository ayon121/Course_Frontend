/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getAllCoursesAdmin } from "@/actions/course/courseActions";
import Image from "next/image";
import { deleteCourseServer } from "@/actions/course/deleteCourse";
import { toast } from "sonner";

export default function AllCoursesAdmin() {
    const [courses, setCourses] = useState<any[]>([]);
    const [, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllCoursesAdmin();
            setCourses(data);
        };
        fetchData();
    }, []);

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        setDeletingId(id);

        startTransition(async () => {
            const res = await deleteCourseServer(id);

            if (res.success) {
                toast.success("Course deleted!");
                window.location.reload();
            } else {
                toast.error(res.message || "Unable to delete");
            }

            setDeletingId(null);
        });
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
                <div
                    key={course._id}
                    className="border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
                    onClick={(e) => {
                        // Prevent card click if Edit/Delete button clicked
                        if ((e.target as HTMLElement).tagName === "BUTTON") return;
                        router.push(`/0213A/admin/coursedetails/${course._id}`);
                    }}
                >
                    <Image
                        width={300}
                        height={300}
                        src={course.banner || "/placeholder-course.png"}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                    />

                    <h2 className="font-semibold text-lg">
                        Published : {course.isPublished ? "Yes" : "No"}
                    </h2>

                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {course.description}
                    </p>

                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={() => router.push(`/0213A/admin/editcourse/${course._id}`)}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(course._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                            {deletingId === course._id ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
