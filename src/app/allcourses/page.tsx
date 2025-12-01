/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { getAllCoursesPublic } from "@/actions/coursepublic/getAllCoursesPublic";

export default function AllPublicCourses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [meta, setMeta] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch Courses
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const result = await getAllCoursesPublic(page, searchTerm);
            console.log(result.data);
            setCourses(result.data);
            setMeta(result.meta);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [page, searchTerm]);

    return (
        <div className="min-h-screen w-full bg-white relative ">
            <div
                className="absolute inset-0 z-0 opacity-50"
                style={{
                    background: "#ffffff",
                    backgroundImage: `
                        radial-gradient(
                        circle at top right,
                        rgba(70, 130, 180, 0.5),
                        transparent 70%
                        )
                    `,
                    filter: "blur(80px)",
                    backgroundRepeat: "no-repeat",
                }}
            />

    



            <div className="max-w-7xl mx-auto p-6 font-poppins relative z-10">
                {/* Search Bar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold font-mono tracking-widest">All Courses</h1>

                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="px-4 py-2 border rounded-lg w-64 shadow-sm"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="bg-gray-200 animate-pulse h-64 rounded-xl"
                            ></div>
                        ))}
                    </div>
                )}

                {/* Course Cards */}
                {!loading && courses?.length === 0 && (
                    <p className="text-center text-gray-500">No courses found.</p>
                )}

                <div className="min-h-screen">
                    {!loading && courses?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {courses?.map((course) => (
                                <div
                                    key={course._id}
                                    className="border rounded-xl  hover:shadow-lg transition p-3 bg-white/50 shadow-2xl"
                                >
                                    <div className="w-full h-44 rounded-xl overflow-hidden">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={course?.banner || "/placeholder-course.png"}
                                            alt={course?.title}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />

                                    </div>

                                    <h2 className="mt-3 text-xl font-semibold">{course.title}</h2>

                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="mt-3 flex justify-between items-center">
                                        <p className="text-lg font-bold text-gray-800">
                                            {course.discountedPrice || course.price} Tk
                                        </p>

                                        <button className="btn px-3 py-2 bg-gray-900 text-white rounded-lg text-sm">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                {/* Pagination */}
                {meta && (
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="px-3 py-2 bg-gray-100 rounded-lg shadow">
                            Page {meta.page} of {meta.totalPage}
                        </span>

                        <button
                            disabled={page === meta.totalPage}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
