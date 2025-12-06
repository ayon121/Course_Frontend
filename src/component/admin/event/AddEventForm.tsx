"use client";

import { addEventServer } from "@/actions/event/addEventServer";
import { useState } from "react";
import { toast } from "sonner";


export default function AddEventForm() {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        address: "",
        city: "",
        country: "",
        mapLink: "",
        coverPhoto: "",
        gallery: [] as string[],
        category: "",
        tags: [] as string[],
        isOnline: false,
        registrationLink: "",
        status: "UPCOMING",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        // Only input type="checkbox" has checked
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: "tags" | "gallery", index: number) => {
        const newArr = [...formData[field]];
        newArr[index] = e.target.value;
        setFormData({ ...formData, [field]: newArr });
    };

    const addArrayField = (field: "tags" | "gallery") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayField = (field: "tags" | "gallery", index: number) => {
        const newArr = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArr });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title: formData.title,
            slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
            shortDescription: formData.shortDescription,
            description: formData.description,
            date: {
                startDate: formData.startDate,
                endDate: formData.endDate || undefined,
            },
            time: {
                startTime: formData.startTime || undefined,
                endTime: formData.endTime || undefined,
            },
            location: {
                address: formData.address,
                city: formData.city,
                country: formData.country,
                mapLink: formData.mapLink,
            },
            coverPhoto: formData.coverPhoto,
            gallery: formData.gallery,
            category: formData.category,
            tags: formData.tags,
            isOnline: formData.isOnline,
            registrationLink: formData.registrationLink,
            status: formData.status,
        };

        const result = await addEventServer(payload);
        if (result.success) {
            toast.success("Event added successfully!");
            setFormData({
                title: "",
                slug: "",
                shortDescription: "",
                description: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                address: "",
                city: "",
                country: "",
                mapLink: "",
                coverPhoto: "",
                gallery: [],
                category: "",
                tags: [],
                isOnline: false,
                registrationLink: "",
                status: "UPCOMING",
            });
        } else {
            toast.error(result.message || "Failed to add event");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
            <div>
                <label className="font-semibold">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="input w-full" required />
            </div>

            <div>
                <label className="font-semibold">Short Description</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="input w-full h-16" required />
            </div>

            <div>
                <label className="font-semibold">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="input w-full h-32" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input w-full" required />
                </div>
                <div>
                    <label className="font-semibold">End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input w-full" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">Start Time</label>
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="input w-full" />
                </div>
                <div>
                    <label className="font-semibold">End Time</label>
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="input w-full" />
                </div>
            </div>

            <div>
                <label className="font-semibold">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="input w-full" required />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} className="input w-full" />
                <input type="text" placeholder="Country" name="country" value={formData.country} onChange={handleChange} className="input w-full" />
                <input type="text" placeholder="Map Link" name="mapLink" value={formData.mapLink} onChange={handleChange} className="input w-full" />
            </div>

            <div>
                <label className="font-semibold">Cover Photo URL</label>
                <input type="text" name="coverPhoto" value={formData.coverPhoto} onChange={handleChange} className="input w-full" required />
            </div>

            {/* Gallery */}
            <div>
                <label className="font-semibold">Gallery URLs</label>
                {formData.gallery.map((_, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                        <input type="text" value={formData.gallery[idx]} onChange={(e) => handleArrayChange(e, "gallery", idx)} className="input w-full" />
                        <button type="button" onClick={() => removeArrayField("gallery", idx)} className="btn btn-sm btn-error">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayField("gallery")} className="btn btn-sm bg-gray-800 text-white">Add Image</button>
            </div>

            {/* Tags */}
            <div>
                <label className="font-semibold my-3">Tags</label>
                {formData.tags.map((_, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                        <input type="text" value={formData.tags[idx]} onChange={(e) => handleArrayChange(e, "tags", idx)} className="input w-44" />
                        <button type="button" onClick={() => removeArrayField("tags", idx)} className="btn btn-sm btn-error">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayField("tags")} className="btn btn-sm bg-gray-800 text-white mx-4">Add Tag</button>
            </div>

            <div className="flex items-center gap-4">
                <label className="font-semibold">Online Event?</label>
                <input type="checkbox" name="isOnline" checked={formData.isOnline} onChange={handleChange} className="checkbox" />
            </div>

            <div>
                <label className="font-semibold">Registration Link</label>
                <input type="text" name="registrationLink" value={formData.registrationLink} onChange={handleChange} className="input w-full" />
            </div>

            <div>
                <label className="font-semibold">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="input w-full">
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ONGOING">ONGOING</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
            </div>

            <button type="submit" className="btn bg-gray-800 text-white w-full mt-4">Add Event</button>
        </form>
    );
}
