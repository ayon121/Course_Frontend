/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { getMySinglePurchasedCourse } from "@/actions/user/getMySinglePurchasedCourse";

interface PurchasedCourseClientProps {
  courseId: string;
}

export default function PurchasedCourseClient({ courseId }: PurchasedCourseClientProps) {
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const res = await getMySinglePurchasedCourse(courseId);
      if (res.success) {
        setCourseData(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="text-center py-10">Loading course...</p>;
  if (error) return <p className="text-center py-10 text-red-500 text-2xl">{error}</p>;
  if (!courseData) return <p className="text-center py-10 text-red-500 text-2xl">Course not found.</p>;

  console.log(courseData);
  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-10">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{courseData.coursetitle}</h1>
          <p className="text-gray-600">{courseData.description}</p>
          <p className="text-sm text-gray-500">
            Instructor: {courseData.instructor} | Duration: {courseData.duration}
          </p>
        </div>
      </div>

      {/* Modules List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
        <div className="space-y-3">
          {courseData.modules.map((mod: any, idx: number) => (
            <div
              key={mod._id}
              className={`flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition ${
                courseData.completedModules.includes(mod._id) ? "bg-green-50" : "bg-white"
              }`}
            >
              <div>
                <h3 className="font-semibold">{idx + 1}. {mod.title}</h3>
              </div>
              <a
                href={mod.videoLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                <PlayCircle className="w-5 h-5" /> Watch
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
