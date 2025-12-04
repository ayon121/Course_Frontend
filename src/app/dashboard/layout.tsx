/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import {
    Menu,
    X,
    BookOpen,
    GraduationCap,
    Bell,
    UserCircle,
    Home,
    LogOut,
    Award,
    PlayCircle,
} from "lucide-react";

import { logoutUser } from "@/actions/auth/logoutUser";
import { UserInfo } from "@/actions/auth/user.interface";
import { getUserInfoServer } from "@/actions/auth/getUserInfo";

export default function StudentLayout({ children }: any) {
    const [open, setOpen] = useState(true); // desktop expand/collapse
    const [mobileOpen, setMobileOpen] = useState(false); // mobile sidebar
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState<UserInfo>();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await getUserInfoServer();
            setUser(userInfo);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        logoutUser();
    };

    const navItems = [
        { title: "My Courses", href: "/dashboard", icon: BookOpen },
        { title: "Continue Learning", href: "/dashboard/continue", icon: PlayCircle },
        { title: "Achievements", href: "/dashboard/achievements", icon: Award },
        { title: "Learning Progress", href: "/dashboard/progress", icon: GraduationCap },
        { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
        { title: "Profile", href: "/dashboard/profile", icon: UserCircle },
        { title: "Home", href: "/", icon: Home },
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex bg-[#f8f9fb] text-gray-900 overflow-hidden font-poppins">

            {/* ------------------------------ */}
            {/* MOBILE / TABLET TOP NAVBAR */}
            {/* ------------------------------ */}
            <div className="lg:hidden w-full fixed top-0 left-0 z-50 bg-white shadow-md border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <button onClick={() => setMobileOpen(true)}>
                    <Menu className="w-7 h-7 text-gray-700" />
                </button>

                <h2 className="text-lg font-bold tracking-widest">Student Portal</h2>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                >
                    <LogOut size={16} />
                </button>
            </div>

            {/* --------------------------------------- */}
            {/* MOBILE SIDEBAR OVERLAY */}
            {/* --------------------------------------- */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setMobileOpen(false)}
            />

            {/* --------------------------------------- */}
            {/* MOBILE SIDEBAR */}
            {/* --------------------------------------- */}
            <aside
                className={`lg:hidden fixed top-0 left-0 h-full bg-white w-64 shadow-xl z-60 p-5 border-r border-gray-200 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold tracking-widest font-mono">Student Portal</h1>
                    <button onClick={() => setMobileOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex flex-col gap-3">
                    {navItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="
                  flex items-center gap-3 p-3 rounded-xl 
                  transition-all bg-white hover:bg-gray-50
                  border border-gray-200 hover:border-gray-300
                  shadow-sm hover:shadow-md
                "
                            >
                                <Icon className="w-5 h-5 text-blue-500" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-6 flex items-center gap-2 w-full p-3 bg-red-500 text-white rounded-xl"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* ------------------------------ */}
            {/* DESKTOP SIDEBAR */}
            {/* ------------------------------ */}
            <div className="hidden lg:block relative z-50">
                <aside
                    className={`
            ${open ? "w-64" : "w-20"}
            transition-all duration-300
            bg-white/70 backdrop-blur-xl border-r border-gray-200
            shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            p-5 flex flex-col relative rounded-b-2xl
          `}
                >
                    {/* Toggle Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition z-50"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    {/* Title */}
                    {open && (
                        <div className="mb-7">
                            <h1 className="text-xl font-bold font-mono tracking-widest">Student Portal</h1>
                            <span className="text-xs tracking-widest font-mono">
                                Hello, {user?.name || "Student"}
                            </span>
                        </div>
                    )}

                    {/* Sidebar Menu */}
                    <nav className="flex flex-col gap-3 mt-4">
                        {navItems.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className="
                    group flex items-center gap-3 p-3 rounded-xl 
                    transition-all bg-white hover:bg-gray-50
                    border border-gray-200 hover:border-gray-300
                    shadow-sm hover:shadow-md
                  "
                                >
                                    <Icon className="w-5 h-5 text-gray-800 group-hover:scale-110 transition" />
                                    {open && <span>{item.title}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="mt-6 flex items-center gap-2 p-3 bg-red-500 text-white rounded-xl"
                    >
                        <LogOut size={18} />
                        {open && "Logout"}
                    </button>
                </aside>
            </div>

            {/* ------------------------------ */}
            {/* MAIN CONTENT */}
            {/* ------------------------------ */}
            <div className="min-h-screen w-full relative flex-1 z-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                                linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
                                linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
                            `,
                        backgroundSize: "40px 40px",
                    }}
                />

                <main className=" p-3  md:p-10 pt-20 lg:pt-10 text-gray-900 z-50 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
