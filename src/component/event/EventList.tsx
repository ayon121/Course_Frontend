/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllEventsServer } from "@/actions/event/getAllEventsServer";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";


interface Event {
    _id: string;
    title: string;
    coverPhoto: string;
    shortDescription: string;
    startDate: string;
    endDate?: string;
    status: string;
}

export default function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchEvents = async (pageNumber = 1, searchTerm = "") => {
        setLoading(true);
        try {
            const query: Record<string, string> = { page: pageNumber.toString(), limit: limit.toString() };
            if (searchTerm) query.searchTerm = searchTerm;

            const result = await getAllEventsServer(query);
            if (result.success) {
                setEvents(result.data);
                setTotalPages(result.meta?.totalPage || 1);
                setPage(result.meta?.page || 1);
            } else {
                toast.error(result.message || "Failed to fetch events");
            }
        } catch (err: any) {
            toast.error(err.message || "Error fetching events");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEvents(1, search);
    };

    const handlePageChange = (newPage: number) => {
        fetchEvents(newPage, search);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 font-poppins">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-widest">Events</h2>
                <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full md:w-64"
                    />
                    <button type="submit" className="btn bg-gray-800 text-white">Search</button>
                </form>
            </div>

            <div className="min-h-screen">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(limit)].map((_, idx) => (
                        <div key={idx} className="p-4 rounded-lg shadow-2xl animate-pulse h-64 bg-gray-100" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {events.map((event) => (
                        <div key={event._id} className=" rounded-lg shadow-2xl hover:shadow-lg transition overflow-hidden flex flex-col">
                            <div className="relative w-full h-48">
                                <Image
                                    src={event.coverPhoto}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-1">{event.shortDescription}</p>
                                <p className="text-sm text-gray-500 mb-2">
                                    <span className="font-semibold">Start:</span> {new Date(event.startDate).toLocaleDateString()}
                                </p>
                                {event.endDate && (
                                    <p className="text-sm text-gray-500 mb-2">
                                        <span className="font-semibold">End:</span> {new Date(event.endDate).toLocaleDateString()}
                                    </p>
                                )}
                                <p className={`text-sm font-semibold mb-2 ${event.status === "UPCOMING" ? "text-green-600" : event.status === "ONGOING" ? "text-blue-600" : "text-gray-500"}`}>
                                    Status: {event.status}
                                </p>
                                <div className="w-full flex justify-end">
                                    <Link href={`/allevents/${event._id}`} className="btn  mt-auto w-52 bg-gray-800 text-white text-center tracking-widest text-sm ">
                                        See Details <ArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="px-3 py-1 border rounded">{page} / {totalPages}</span>
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
