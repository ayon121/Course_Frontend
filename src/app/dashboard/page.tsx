"use client";

import { PlayCircle, BookOpen, BarChart2 } from "lucide-react";

export default function StudentDashboardPage() {
    return (
        <div className="space-y-8">
            
            {/* Greeting */}
            <section>
                <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Continue your learning journey and achieve your goals.
                </p>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white  rounded-xl shadow-lg">
                    <h2 className="text-lg font-medium">Enrolled Courses</h2>
                    <p className="text-3xl font-bold mt-2">06</p>
                </div>

                <div className="p-6 bg-white  rounded-xl shadow-lg">
                    <h2 className="text-lg font-medium">Completed Lessons</h2>
                    <p className="text-3xl font-bold mt-2">42</p>
                </div>

                <div className="p-6 bg-white  rounded-xl shadow-lg">
                    <h2 className="text-lg font-medium">Progress</h2>
                    <p className="text-3xl font-bold mt-2">78%</p>
                </div>
            </section>

            {/* Continue Learning */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>

                <div className="bg-white  p-6 rounded-xl shadow-lg flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" /> Modern JavaScript Bootcamp
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">45% Completed</p>
                    </div>

                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                        <PlayCircle className="w-5 h-5" /> Continue
                    </button>
                </div>
            </section>

            {/* Recommended Courses */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white  p-5 rounded-xl shadow-lg hover:scale-[1.02] transition"
                        >
                            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
                            <h3 className="font-semibold text-lg mb-2">Course Title {i}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Short description about the course.
                            </p>
                            <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                                View Course
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
