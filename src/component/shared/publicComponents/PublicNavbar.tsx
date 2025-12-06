"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getCookie } from "@/actions/auth/tokenHandlers";
import { logoutUser } from "@/actions/auth/logoutUser";

const PublicNavbar = () => {
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {

        const fetchCokkie = async () => {
            const accessToken = await getCookie("accessToken");
            if (accessToken) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        };
        fetchCokkie();
    }, []);

    const handleLogout = async () => {
        logoutUser();
    };

    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-16">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-gray-9500 font-mono tracking-widest">
                    Guitar Hall
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="hover:text-gray-900">Home</Link>
                    <Link href="/allcourses" className="hover:text-gray-900">All Courses</Link>
                    <Link href="/about" className="hover:text-gray-900">About Us</Link>

                    {loggedIn && (
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-green-950 transition"
                        >
                            Dashboard
                        </Link>
                    )}

                    {!loggedIn ? (
                        <Link
                            href="/login"
                            className="btn px-4 py-2 rounded-lg transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-lg px-5 pb-5 space-y-4">

                    <Link href="/" className="block py-2 border-b" onClick={() => setOpen(false)}>Home</Link>
                    <Link href="/allcourses" className="block py-2 border-b" onClick={() => setOpen(false)}>All Courses</Link>
                    <Link href="/about" className="block py-2 border-b" onClick={() => setOpen(false)}>About Us</Link>

                    {loggedIn && (
                        <Link
                            href="/dashboard"
                            className="block py-2 border-b text-gray-900 font-medium"
                            onClick={() => setOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}

                    {!loggedIn ? (
                        <Link
                            href="/login"
                            className="block py-2 text-gray-900 font-medium"
                            onClick={() => setOpen(false)}
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                handleLogout();
                                setOpen(false);
                            }}
                            className="block w-full text-left py-2 text-red-600 font-medium"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default PublicNavbar;
