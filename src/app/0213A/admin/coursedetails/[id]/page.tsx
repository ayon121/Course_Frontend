/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { getCourseDetailsServer, toggleCoursePublishServer } from "@/actions/course/courseActions";
import { deleteCourseServer } from "@/actions/course/deleteCourse";


export default function CourseDetailsAdmin() {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingPublish, setIsUpdatingPublish] = useState(false);
  const [, startTransition] = useTransition();

  const router = useRouter();
  const params = useParams(); 
  const courseId = params?.id as string;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseDetailsServer(courseId);
        setCourse(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await deleteCourseServer(courseId);
      if (res.success) {
        toast.success("Course deleted!");
        router.push("/0213A/admin/allcourse");
      } else {
        toast.error(res.message || "Unable to delete course");
      }
    } catch (err: any) {
      toast.error(err.message || "Unable to delete course");
    }
  };

  const handleTogglePublish = () => {
    startTransition(async () => {
      try {
        setIsUpdatingPublish(true);
        const res = await toggleCoursePublishServer(courseId, !course.isPublished);
        if (res.success) {
          toast.success(res.message);
          setCourse({ ...course, isPublished: !course.isPublished });
        } else {
          toast.error(res.message || "Failed to update publish status");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to update publish status");
      } finally {
        setIsUpdatingPublish(false);
      }
    });
  };

  if (loading) return <p className="p-4">Loading course details...</p>;
  if (!course) return <p className="p-4">Course not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start gap-2">
        <h1 className="text-3xl font-bold">{course.title}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/0213A/admin/editcourse/${course._id}`)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={handleDeleteCourse}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>

          <button
            onClick={handleTogglePublish}
            disabled={isUpdatingPublish}
            className={`px-4 py-2 rounded-lg text-white ${
              course.isPublished
                ? "bg-red-600 hover:bg-red-800"
                : "bg-green-600 hover:bg-green-800"
            }`}
          >
            {isUpdatingPublish
              ? "Updating..."
              : course.isPublished
              ? "Unpublish"
              : "Publish"}
          </button>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden shadow">
        <Image
          src={course.banner}
          width={800}
          height={400}
          alt={course.title}
          className="w-full h-auto object-fill"
        />
      </div>

      <div className="space-y-2">
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Price:</strong> {course.price} tk</p>
        <p><strong>Discounted Price:</strong> {course.discountedPrice} tk</p>
        <p><strong>Category:</strong> {course.category || "N/A"}</p>
        <p><strong>Published:</strong> {course.isPublished ? "Yes" : "No"}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Modules</h2>
        {course.modules?.length === 0 && <p>No modules added</p>}

        <div className="space-y-4">
          {course.modules?.map((mod: any, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow space-y-2"
            >
              <h3 className="font-semibold text-lg">{mod.title}</h3>
              <p>Rank: {mod.rank}</p>
              <p>Public: {mod.isPublic ? "Yes" : "No"}</p>

              {mod.videoLink && (
                <div className="mt-2 w-full h-96 rounded-xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${
                      mod.videoLink.split("youtu.be/")[1] ||
                      mod.videoLink.split("v=")[1]
                    }`}
                    title={mod.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
