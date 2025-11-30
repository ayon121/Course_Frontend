/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

interface Module {
    title: string;
    videoLink: string;
    isPublic: boolean;
    rank: number;
}

export default function AddCoursePage() {
    const [modules, setModules] = useState<Module[]>([
        { title: "", videoLink: "", isPublic: false, rank: 0 },
    ]);

    const [category, setCategory] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [isPublished, setIsPublished] = useState<boolean>(false);

    const removeModule = (index: number) => {
        const updated = modules.filter((_, i) => i !== index);
        setModules(updated);
    };

    const handleModuleChange = <K extends keyof Module>(
        index: number,
        field: K,
        value: Module[K]
    ) => {
        const updated = [...modules];
        updated[index] = { ...updated[index], [field]: value };
        setModules(updated);
    };

    const addModule = () => {
        setModules([
            ...modules,
            { title: "", videoLink: "", isPublic: false, rank: 0 },
        ]);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Construct payload exactly for backend
        const formData = {
            title: e.target.title.value,
            description: e.target.description.value,
            duration: e.target.duration.value,
            instructor: e.target.instructor.value,
            banner: e.target.banner.value,
            price: Number(e.target.price.value),
            discountedPrice: Number(e.target.discountedPrice.value) || 0,
            modules: modules.map((mod) => ({
                title: mod.title,
                videoLink: mod.videoLink,
                isPublic: mod.isPublic,
                rank: mod.rank,
            })),
            category: category || "",
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            isPublished,
        };

        console.log("Submitted Course Data:", formData);

        // Here you can call your API
        // axios.post("/api/courses", formData)
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10 border border-gray-300 rounded-xl bg-white/50 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Add New Course</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gray-100/70 p-4 sm:p-6 rounded-xl shadow-md"
            >
                {/* Banner */}
                <div>
                    <label className="font-semibold">Banner URL</label>
                    <input
                        name="banner"
                        type="text"
                        className="w-full p-2 rounded bg-white text-sm sm:text-base"
                        required
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="font-semibold">Course Title</label>
                    <input
                        name="title"
                        type="text"
                        className="w-full p-2 rounded bg-white text-sm sm:text-base"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        name="description"
                        className="w-full p-2 rounded bg-white text-sm sm:text-base"
                        rows={4}
                        required
                    />
                </div>

                {/* Duration & Instructor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Duration</label>
                        <input
                            name="duration"
                            type="text"
                            className="w-full p-2 rounded bg-white text-sm sm:text-base"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Instructor</label>
                        <input
                            name="instructor"
                            type="text"
                            className="w-full p-2 rounded bg-white text-sm sm:text-base"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Price</label>
                        <input
                            name="price"
                            type="number"
                            className="w-full p-2 rounded bg-white text-sm sm:text-base"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Discounted Price</label>
                        <input
                            name="discountedPrice"
                            type="number"
                            className="w-full p-2 rounded bg-white text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Category & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 rounded bg-white text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full p-2 rounded bg-white text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Modules */}
                <h2 className="text-xl sm:text-2xl font-bold mt-8">Course Modules</h2>
                {modules.map((mod, index) => (
                    <div
                        key={index}
                        className="relative p-4 pt-14 bg-white rounded-lg shadow-md space-y-3"
                    >
                        <button
                            type="button"
                            onClick={() => removeModule(index)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl sm:text-2xl font-bold border border-red-600 rounded-full flex justify-center items-center w-7 h-7 sm:w-8 sm:h-8"
                        >
                            ×
                        </button>

                        <input
                            type="text"
                            placeholder="Module Title"
                            className="w-full p-2 rounded border text-sm sm:text-base"
                            value={mod.title}
                            onChange={(e) =>
                                handleModuleChange(index, "title", e.target.value)
                            }
                        />

                        <input
                            type="text"
                            placeholder="Video Link"
                            className="w-full p-2 rounded border text-sm sm:text-base"
                            value={mod.videoLink}
                            onChange={(e) =>
                                handleModuleChange(index, "videoLink", e.target.value)
                            }
                        />
                        <input
                            type="number"
                            placeholder="Rank"
                            className="w-full p-2 rounded border text-sm sm:text-base"
                            value={mod.rank || ""}
                            onChange={(e) =>
                                handleModuleChange(
                                    index,
                                    "rank",
                                    e.target.value === "" ? 0 : parseInt(e.target.value)
                                )
                            }
                        />

                        <label className="flex items-center gap-2 text-sm sm:text-base">
                            <input
                                type="checkbox"
                                checked={mod.isPublic}
                                onChange={(e) =>
                                    handleModuleChange(index, "isPublic", e.target.checked)
                                }
                            />
                            Publicly Available
                        </label>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addModule}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm sm:text-base"
                >
                    + Add Module
                </button>

                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        id="publish"
                    />
                    <label htmlFor="publish" className="text-sm sm:text-base">
                        Publish Course
                    </label>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg w-full text-sm sm:text-base mt-4"
                >
                    Submit Course
                </button>
            </form>
        </div>
    );
}
