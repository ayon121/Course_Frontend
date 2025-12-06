"use client";

import { updateBannerServer } from "@/actions/banner/addbanner";
import { useState } from "react";
import { toast } from "sonner";


interface BannerPhoto {
    url: string;
    link?: string;
}

export default function BannerForm() {
    const [photos, setPhotos] = useState<BannerPhoto[]>([
        { url: "", link: "" }
    ]);

    const addBanner = () => {
        if (photos.length >= 4) return;
        setPhotos([...photos, { url: "", link: "" }]);
    };

    const removeBanner = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        setPhotos(newPhotos);
    };

    const updateField = (index: number, field: keyof BannerPhoto, value: string) => {
        const updated = [...photos];
        updated[index][field] = value;
        setPhotos(updated);
    };

    const handleSubmit = async () => {
        const cleanedPhotos = photos.filter((p) => p.url.trim() !== "");

        if (cleanedPhotos.length === 0) {
            alert("Please add at least one banner image.");
            return;
        }

        const res = await updateBannerServer(cleanedPhotos);

        if (res?.success === false) {
            toast.error("Failed to update banner");
        } else {
            toast.success("Banner updated successfully!");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Banner Manager</h2>

            {photos.map((photo, index) => (
                <div key={index} className="border p-3 mb-3 rounded-md">
                    {/* Image URL */}
                    <div className="mb-2">
                        <label className="block text-sm mb-1">Image URL</label>
                        <input
                            type="text"
                            value={photo.url}
                            onChange={(e) => updateField(index, "url", e.target.value)}
                            placeholder="https://example.com/banner.jpg"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Optional Link */}
                    <div className="mb-2">
                        <label className="block text-sm mb-1">Optional Link</label>
                        <input
                            type="text"
                            value={photo.link || ""}
                            onChange={(e) => updateField(index, "link", e.target.value)}
                            placeholder="/course/123"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {photos.length > 1 && (
                        <button
                            onClick={() => removeBanner(index)}
                            className="text-red-500 text-sm"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={addBanner}
                    disabled={photos.length >= 4}
                    className={`px-4 py-2 rounded text-white ${
                        photos.length >= 4
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600"
                    }`}
                >
                    Add Banner ({photos.length}/4)
                </button>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Save Banner
                </button>
            </div>
        </div>
    );
}
