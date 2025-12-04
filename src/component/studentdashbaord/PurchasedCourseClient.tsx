/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PlayCircle, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { getMySinglePurchasedCourse } from "@/actions/user/getMySinglePurchasedCourse";
import { updateLastViewedModule } from "@/actions/user/updateLastViewedModule";

interface PurchasedCourseClientProps {
    courseId: string;
}

export default function PurchasedCourseClient({ courseId }: PurchasedCourseClientProps) {
    const [courseData, setCourseData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Convert YouTube URL → Embed
    const convertToEmbed = (url: string) => {
        try {
            const videoId = url.split("youtu.be/")[1].split("?")[0];
            // return `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&controls=1&iv_load_policy=3`;
            return `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&controls=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`;
        } catch {
            return "";
        }
    };

    //  Update last viewed module
    const handleModuleView = async (moduleId: string) => {
        console.log("👉 Called updateLastViewedModule:", moduleId);

        const res = await updateLastViewedModule(courseId, moduleId);
        console.log("Server Response:", res);
    };

    // DEMO: Mark module as completed
    const handleModuleComplete = (moduleId: string) => {
        console.log("✅ Marking module as completed:", moduleId);
        // Later: call backend API here
    };

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            const res = await getMySinglePurchasedCourse(courseId);

            if (res.success) {
                const course = res.data;

                let startIndex = 0;

                if (course.lastViewedModuleId) {
                    const idx = course.modules.findIndex(
                        (m: any) => m._id === course.lastViewedModuleId
                    );
                    startIndex = idx !== -1 ? idx : 0;
                }

                setCurrentIndex(startIndex);
                setCourseData(course);

                // DEMO call for initial load
                handleModuleView(course.modules[startIndex]._id);

            } else {
                setError(res.message);
            }
            setLoading(false);
        };

        fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    if (loading) return <p className="text-center py-10">Loading course...</p>;
    if (error) return <p className="text-center py-10 text-red-500 text-2xl">{error}</p>;
    if (!courseData) return <p className="text-center py-10 text-red-500 text-2xl">Course not found.</p>;

    const currentModule = courseData.modules[currentIndex];



    // Handle switching modules
    const changeModule = async (newIndex: number) => {
        setCurrentIndex(newIndex);

        // ⭐ Call server action on module switch
        handleModuleView(courseData.modules[newIndex]._id);
    };

    return (
        <div className="  space-y-8 md:space-y-10 max-w-7xl mx-auto px-4 py-10">

            {/* Course Header */}
            <div className="flex flex-col md:flex-row gap-6 pb-4">
                <div className="flex-1 space-y-2">
                    <h1 className="text-4xl font-bold">{courseData.coursetitle}</h1>
                    <p className="text-gray-600 ">{courseData.description}</p>
                    <p className="text-sm text-gray-500">
                        Instructor: {courseData.instructor} | Duration: {courseData.duration}
                    </p>
                    <p className="text-sm text-gray-500">
                        Purchased: {new Date(courseData.purchasedAt).toLocaleDateString()}
                    </p>
                </div>


            </div>

            {/* Video Player */}
            <section className="bg-black rounded-xl overflow-hidden shadow-lg">

                <iframe
                    src={convertToEmbed(currentModule.videoLink)}
                    className="w-full h-[220px]  md:h-[450px]"
                    allowFullScreen
                ></iframe>
            </section>

            {/* Mark Completed Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => handleModuleComplete(currentModule._id)}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                    <CheckCircle className="w-5 h-5" /> Mark as Completed
                </button>
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex justify-between gap-2">
                <button
                    disabled={currentIndex === 0}
                    onClick={() => changeModule(currentIndex - 1)}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200  disabled:opacity-40"
                >
                    <ChevronLeft /> Previous
                </button>

                <button
                    disabled={currentIndex === courseData.modules.length - 1}
                    onClick={() => changeModule(currentIndex + 1)}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-40"
                >
                    Next <ChevronRight />
                </button>
            </div>

            {/* Module List */}
            <section>
                <h2 className="text-2xl font-semibold mb-3">Course Modules</h2>
                <div className="space-y-3 max-h-[500px] overflow-y-scroll px-2.5 py-4 border border-gray-200 rounded-xl">
                    {courseData.modules.map((mod: any, idx: number) => {
                        const isActive = idx === currentIndex;
                        const isCompleted = courseData.completedModules.includes(mod._id);

                        return (
                            <div
                                key={mod._id}
                                onClick={() => changeModule(idx)}
                                className={`cursor-pointer flex justify-between items-center p-4 border rounded-xl transition ${isActive
                                    ? "bg-blue-50 border-blue-400 shadow"
                                    : isCompleted
                                        ? "bg-green-50 border-green-400"
                                        : "bg-white "
                                    }`}
                            >
                                <h3 className="font-semibold">
                                    {idx + 1}. {mod.title}
                                </h3>

                                <PlayCircle className="w-5 h-5 text-blue-600" />
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
