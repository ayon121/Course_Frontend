/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { getCourseDetailsServer } from "@/actions/course/courseActions";
import { updateCourseServer } from "@/actions/course/updateCourse";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discountedPrice, setDiscountedPrice] = useState<number | "">("");
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseDetailsServer(courseId);

        if (!data) {
          toast.error("Course not found");
          router.push("/0213A/admin/allcourse");
          return;
        }

        setTitle(data.title || "");
        setBanner(data.banner || "");
        setDescription(data.description || "");
        setDuration(data.duration || "");
        setInstructor(data.instructor || "");
        setPrice(data.price || "");
        setDiscountedPrice(data.discountedPrice || "");

        setModules(
          (data.modules || []).map((m: any, idx: number) => ({
            ...m,
            rank: m.rank ?? idx + 1,
          }))
        );
      } catch (err) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  const handleModuleChange = (index: number, field: string, value: any) => {
    setModules((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      { title: "", videoLink: "", isPublic: false, rank: prev.length + 1 },
    ]);
  };

  const deleteModule = (index: number) => {
    if (!confirm("Delete this module?")) return;
    setModules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const payload = {
        title,
        banner,
        description,
        duration,
        instructor,
        price: Number(price) || 0,
        discountedPrice: Number(discountedPrice) || 0,
        modules,
      };

      const res = await updateCourseServer(courseId, payload);

      if (res?.success) {
        toast.success("Course updated");
        router.push("/0213A/admin/allcourse");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Course</h1>

      {/* ============================
          BASIC DETAILS
      ==============================*/}

      <div className="space-y-4">

        <div>
          <label className="font-medium mb-1 block">Course Title</label>
          <input
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course title"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Banner Image URL</label>
          <input
            className="w-full p-2 border rounded"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            placeholder="Banner URL"
          />
        </div>

        {banner && (
          <div className="w-full h-40 rounded overflow-hidden">
            <Image
              src={banner}
              alt="banner"
              width={800}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div>
          <label className="font-medium mb-1 block">Course Description</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium mb-1 block">Duration</label>
            <input
              className="p-2 border rounded w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (e.g. 4 weeks)"
            />
          </div>

          <div>
            <label className="font-medium mb-1 block">Instructor Name</label>
            <input
              className="p-2 border rounded w-full"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="Instructor"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium mb-1 block">Price</label>
            <input
              className="p-2 border rounded w-full"
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Price"
            />
          </div>

          <div>
            <label className="font-medium mb-1 block">Discounted Price</label>
            <input
              className="p-2 border rounded w-full"
              type="number"
              value={discountedPrice}
              onChange={(e) =>
                setDiscountedPrice(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Discounted Price"
            />
          </div>
        </div>
      </div>

      {/* ============================
          MODULES
      ==============================*/}
      <div>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        <p className="text-gray-600 mb-4">
          Add, edit or remove course modules. (Order will follow list sequence)
        </p>

        <div className="space-y-4">
          {modules.map((mod, index) => (
            <div key={index} className="border rounded-xl p-4 bg-white shadow">
              <h3 className="font-semibold text-lg mb-3">
                Module {index + 1}
              </h3>

              <div className="mb-3">
                <label className="font-medium block mb-1">Module Title</label>
                <input
                  className="w-full p-2 border rounded"
                  value={mod.title}
                  onChange={(e) =>
                    handleModuleChange(index, "title", e.target.value)
                  }
                  placeholder="Module title"
                />
              </div>

              <div className="mb-3">
                <label className="font-medium block mb-1">YouTube Video Link</label>
                <input
                  className="w-full p-2 border rounded"
                  value={mod.videoLink}
                  onChange={(e) =>
                    handleModuleChange(index, "videoLink", e.target.value)
                  }
                  placeholder="https://youtu.be/..."
                />
              </div>

              <div className="mb-3">
                <label className="font-medium block mb-1">Rank</label>
                <input
                  className="w-full p-2 border rounded"
                  type="number"
                  value={mod.rank}
                  onChange={(e) =>
                    handleModuleChange(index, "rank", Number(e.target.value))
                  }
                  placeholder="Rank"
                />
              </div>

              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={!!mod.isPublic}
                  onChange={(e) =>
                    handleModuleChange(index, "isPublic", e.target.checked)
                  }
                />
                Public Module
              </label>

              <button
                onClick={() => deleteModule(index)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete Module
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addModule}
          className="mt-4 px-4 py-2 text-black  rounded"
        >
          + Add Module
        </button>
      </div>

      {/* ============================
          SAVE BUTTON
      ==============================*/}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-green-600 text-white rounded text-lg"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
