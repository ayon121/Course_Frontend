/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlayCircle, BookOpen } from "lucide-react";
import Image from "next/image";

export default function StudentDashboardClient({ purchasedCourse }: { purchasedCourse: any }) {
    return (
        <div className="space-y-10">
            {/* Continue Learning */}
            {purchasedCourse && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Continue Learning</h2>

                    <div className="bg-white  rounded-xl shadow-md border border-gray-200  overflow-hidden">
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">

                            {/* Thumbnail */}
                            <div className="w-full md:w-56 h-36 md:h-40 overflow-hidden rounded-lg shadow">
                                <Image
                                    src={purchasedCourse.courseId.banner}
                                    width={300}
                                    height={300}
                                    alt={purchasedCourse.coursetitle}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-blue-500" />
                                    {purchasedCourse.coursetitle}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Duration:</span>{" "}
                                    {purchasedCourse.courseId.duration}
                                </p>

                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Progress:</span>{" "}
                                    {purchasedCourse.progress}%
                                </p>

                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Purchased Date:</span>{" "}
                                    {new Date(purchasedCourse.purchasedAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Continue Button */}
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md">
                                <PlayCircle className="w-5 h-5" />
                                Continue
                            </button>

                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
