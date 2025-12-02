/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getPublicCourseDetailsServer } from "@/actions/coursepublic/getCourseDetails";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CourseDetailsPublicpage = () => {
    const params = useParams();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Extract YouTube Video ID
    const getYouTubeId = (url: string): string | null => {
        if (!url) return null;
        const short = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
        if (short) return short[1];
        const watch = url.match(/v=([A-Za-z0-9_-]+)/);
        if (watch) return watch[1];
        const embed = url.match(/embed\/([A-Za-z0-9_-]+)/);
        if (embed) return embed[1];
        return null;
    };
    // Sticky bottom for mobile
    const [showMobileEnroll, setShowMobileEnroll] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const sidebar = document.getElementById("course-sidebar");
            if (!sidebar) return;

            const rect = sidebar.getBoundingClientRect();

            // Hide sticky bar when the actual sidebar is visible
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                setShowMobileEnroll(false);
            } else {
                setShowMobileEnroll(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPublicCourseDetailsServer(courseId);
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [courseId]);

    if (loading) return <p className="text-center py-20 text-lg">Loading...</p>;
    if (!course) return <p className="text-center py-20 text-2xl font-mono tracking-widest mt-10 font-extrabold">Course not found.</p>;



    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-2 py-10 font-poppins mt-10">

            {/* GRID*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT SIDE CONTENT */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Banner */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        {course.banner && (
                            <Image
                                width={1000}
                                height={600}
                                src={course.banner}
                                alt="Course Banner"
                                className="w-full max-h-[420px] object-cover"
                            />
                        )}
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h1 className="text-2xl lg:text-5xl font-bold leading-snug mb-5">
                            {course.title}
                        </h1>

                        <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    {/* PUBLIC MODULES */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-5">Free Preview Lessons</h2>

                        {course.modules?.filter((m: any) => m.isPublic).length === 0 && (
                            <p className="text-gray-500 italic">
                                No public modules available.
                            </p>
                        )}

                        <div className="space-y-6 md:space-y-8">
                            {course.modules
                                ?.filter((m: any) => m.isPublic)
                                .map((mod: any, idx: number) => {
                                    const videoId = getYouTubeId(mod.videoLink);

                                    return (
                                        <div
                                            key={idx}
                                            className="border rounded-xl bg-white p-3 md:p-5 shadow hover:shadow-lg transition"
                                        >
                                            <h3 className="font-semibold text-sm md:text-lg mb-3">
                                                {mod.title}
                                            </h3>

                                            {videoId ? (
                                                <div className="w-full h-80 rounded-xl overflow-hidden">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={`https://www.youtube.com/embed/${videoId}`}
                                                        title={mod.title}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="rounded-xl"
                                                    />
                                                </div>
                                            ) : (
                                                <p className="text-red-500">
                                                    Invalid YouTube Link
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </section>

                    {/* LOCKED MODULES */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Course Curriculum</h2>

                        <div className="max-h-96 overflow-y-auto pr-2 space-y-4 custom-scroll">
                            {course.modules
                                ?.filter((m: any) => !m.isPublic)
                                .map((mod: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="rounded-lg border px-4 py-3 bg-gray-50 flex justify-between items-center shadow-sm hover:shadow transition"
                                    >
                                        <span className="font-medium">{mod.title}</span>

                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Lock size={18} />
                                            <span className="text-sm">Locked</span>
                                        </div>
                                    </div>
                                ))}

                            {course.modules?.filter((m: any) => !m.isPublic).length === 0 && (
                                <p className="text-gray-500 italic">
                                    No locked modules.
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="lg:col-span-1" id="course-sidebar">
                    <div className="sticky top-20 bg-white rounded-2xl shadow-2xl border p-3 md:p-5 space-y-6">
                        <h1>Course Fee</h1>
                        {/* Price */}
                        <div>
                            <p className="text-3xl font-bold text-gray-800 mb-1">
                                {course.discountedPrice
                                    ? `${course.discountedPrice} BDT`
                                    : `${course.price} BDT`}
                            </p>

                            {course.discountedPrice && (
                                <p className="text-gray-500 line-through text-lg">
                                    {course.price} BDT
                                </p>
                            )}
                        </div>

                        {/* Enroll Button */}
                        <button className="w-full py-4 bg-gray-800 hover:bg-gray-600 text-white text-lg font-semibold rounded-xl transition">
                            Enroll Now
                        </button>

                        {/* Instructor Card */}
                        <div className="border p-5 rounded-xl bg-gray-50 shadow-sm">
                            <h3 className="text-lg font-semibold mb-3">Instructor</h3>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
                                <div>
                                    <p className="font-medium">Coming Soon</p>
                                    <p className="text-sm text-gray-500">
                                        Instructor profile
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Share This Course */}
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success('Course link copied to clipboard!');
                            }}
                            className="w-full py-3 border text-gray-700 hover:bg-gray-100 
                            rounded-xl font-medium flex items-center justify-center gap-2 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.5 12a4.5 4.5 0 118.42-1.77l3.42 1.96a2.25 2.25 0 110 3.62l-3.42 1.96a4.501 4.501 0 11-.96-2.32l3.42-1.96a2.251 2.251 0 110-3.62l-3.42-1.96A4.5 4.5 0 017.5 12z"
                                />
                            </svg>
                            Share this course
                        </button>

                    </div>
                </aside>


                {/* MOBILE BOTTOM STICKY ENROLL BAR */}
                {showMobileEnroll && (
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t rounded-t-2xl shadow-xl p-4 flex items-center justify-between z-50 animate-slide-up ">

                        {/* Price */}
                        <div>
                            <p className="text-lg font-bold text-gray-900">
                                {course.discountedPrice
                                    ? `${course.discountedPrice} BDT`
                                    : `${course.price} BDT`}
                            </p>
                            {course.discountedPrice && (
                                <p className="text-sm line-through text-gray-500">
                                    {course.price} BDT
                                </p>
                            )}
                        </div>

                        {/* Enroll Button */}
                        <button
                            className="px-6 py-3 bg-gray-700 
                        text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
                        >
                            Enroll Now
                        </button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default CourseDetailsPublicpage;
