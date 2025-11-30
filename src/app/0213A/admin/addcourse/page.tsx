/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";

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

    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string>("");

    const handleBannerChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file)); // temp URL for preview
        }
    };

    const removeModule = (index: number) => {
        const updated = modules.filter((_, i) => i !== index);
        setModules(updated);
    };


    const handleModuleChange = (
        index: number,
        field: keyof Module,
        value: string | number | boolean
    ) => {
        const updated = [...modules];
        updated[index][field] = value;
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

        const formData = {
            banner: bannerFile,
            title: e.target.title.value,
            description: e.target.description.value,
            duration: e.target.duration.value,
            instructor: e.target.instructor.value,
            price: e.target.price.value,
            discountedPrice: e.target.discountedPrice.value,
            modules,
        };

        console.log("Submitted Course Data:", formData);
    };

    return (
        <div className="p-10 border-2 border-gray-300 rounded-xl bg-white shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Add New Course</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gray-100 p-6 rounded-xl shadow-md"
            >
                {/* Banner Upload */}
                <div>
                    <label className="block">
                        <span className="font-semibold">Course Banner</span>

                        <div className="mt-4 flex items-center gap-4">
                            <label
                                htmlFor="bannerUpload"
                                className="cursor-pointer bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow hover:bg-gray-800 transition-all text-sm"
                            >
                                Upload Banner
                            </label>

                            {/* Show selected file name */}
                            {bannerPreview ? (
                                <span className="text-sm text-green-600 font-medium">
                                    Image selected
                                </span>
                            ) : (
                                <span className="text-sm text-gray-500">No file chosen</span>
                            )}
                        </div>

                        <input
                            id="bannerUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleBannerChange}
                            className="hidden"
                            required
                        />
                    </label>

                    {/* Image Preview */}
                    {bannerPreview && (
                        <div className="mt-4 w-full h-80 relative rounded-lg overflow-hidden shadow">
                            <Image
                                src={bannerPreview}
                                alt="Banner Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="font-semibold">Course Title</label>
                    <input
                        name="title"
                        type="text"
                        className="w-full p-2 rounded bg-white"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        name="description"
                        className="w-full p-2 rounded bg-white"
                        rows={4}
                        required
                    />
                </div>

                {/* Duration + Price */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Duration</label>
                        <input
                            name="duration"
                            type="text"
                            className="w-full p-2 rounded bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Instructor</label>
                        <input
                            name="instructor"
                            type="text"
                            className="w-full p-2 rounded bg-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Price</label>
                        <input
                            name="price"
                            type="number"
                            className="w-full p-2 rounded bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Discounted Price</label>
                        <input
                            name="discountedPrice"
                            type="number"
                            className="w-full p-2 rounded bg-white"
                            required
                        />
                    </div>
                </div>

                {/* Modules */}
                <h2 className="text-2xl font-bold mt-8">Course Modules</h2>

                {modules.map((mod, index) => (
                    <div key={index} className="relative p-4 pt-14 bg-white rounded-lg shadow-md space-y-3">

                        {/* ❌ Remove Button */}
                        <button
                            type="button"
                            onClick={() => removeModule(index)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-3xl font-bold border-2 border-red-600 rounded-full flex  justify-center items-center w-8 h-8 pb-1.5"
                        >
                            ×
                        </button>

                        <input
                            type="text"
                            placeholder="Module Title"
                            className="w-full p-2 rounded border"
                            value={mod.title}
                            onChange={(e) => handleModuleChange(index, "title", e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Video Link"
                            className="w-full p-2 rounded border"
                            value={mod.videoLink}
                            onChange={(e) => handleModuleChange(index, "videoLink", e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Rank"
                            className="w-full p-2 rounded border"
                            value={mod.rank}
                            onChange={(e) => handleModuleChange(index, "rank", parseInt(e.target.value))}
                        />

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={mod.isPublic}
                                onChange={(e) => handleModuleChange(index, "isPublic", e.target.checked)}
                            />
                            Publicly Available
                        </label>
                    </div>
                ))}


                <button
                    type="button"
                    onClick={addModule}
                    className="px-4 py-2 bg-gray-950 text-white rounded-lg"
                >
                    + Add Module
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg w-full mt-4"
                >
                    Submit Course
                </button>
            </form>
        </div>
    );
}
