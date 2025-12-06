/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { getEventByIdServer } from "@/actions/event/getEventByIdServer";

interface EventDetails {
    _id: string;
    title: string;
    slug?: string;
    shortDescription: string;
    description: string;
    startDate: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    location: {
        address: string;
        city: string;
        country: string;
        mapLink?: string;
    };
    coverPhoto: string;
    gallery?: string[];
    category?: string;
    tags?: string[];
    isOnline?: boolean;
    registrationLink?: string;
    status: string;
}

interface EventDetailsProps {
    id: string; // receive id from parent page
}

export default function EventDetailsPage({ id }: EventDetailsProps) {
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const result = await getEventByIdServer(id);
                if (result.success) {
                    setEvent(result.data);
                } else {
                    toast.error(result.message || "Failed to fetch event");
                }
            } catch (err: any) {
                toast.error(err.message || "Error fetching event");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEvent();
    }, [id]);

    console.log(event);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
                <div className="h-96 bg-gray-200 rounded mb-6" />
                <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-48 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    if (!event) return <div className="text-center py-10">Event not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Cover Photo */}
            <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={event.coverPhoto || "/placeholder-course.png"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            {/* Event Info */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <p className="text-gray-600 text-lg">{event.shortDescription}</p>

                <div className="flex flex-col md:flex-row md:gap-8 mt-4">
                    {/* Dates & Time */}
                    <div className="flex-1">
                        {event.startDate && (<p className="text-gray-700">
                            <span className="font-semibold">Start:</span>{" "}
                            {new Date(event.startDate).toLocaleDateString()}{" "}
                            {event.startTime && `at ${event.startTime}`}
                        </p>)
                        }
                        {event.endDate && (
                            <p className="text-gray-700">
                                <span className="font-semibold">End:</span>{" "}
                                {new Date(event.endDate).toLocaleDateString()}{" "}
                                {event.endTime && `at ${event.endTime}`}
                            </p>
                        )}
                        <p
                            className={`mt-2 font-semibold ${event.status === "UPCOMING"
                                ? "text-green-600"
                                : event.status === "ONGOING"
                                    ? "text-orange-600"
                                    : "text-gray-500"
                                }`}
                        >
                            Status: {event.status}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="flex-1 mt-4 md:mt-0">
                        <h3 className="font-semibold">Location:</h3>
                        <p>{event.location.address}</p>
                        <p>
                            {event.location.city}, {event.location.country}
                        </p>
                        {event.location.mapLink && (
                            <a
                                href={event.location.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-800 underline mt-1 inline-block"
                            >
                                View on Map
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Details:</h3>
                    <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                </div>

                {/* Gallery */}
                {event.gallery && event.gallery.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {event.gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-full h-48 rounded overflow-hidden shadow-sm"
                                >
                                    <Image src={img || "/placeholder-course.png"} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {event.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Registration */}
                {event.registrationLink && (
                    <div className="mt-6">
                        <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition block w-max  "
                        >
                            Register Now
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
