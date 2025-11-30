/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  PlusCircle,
  BookOpen,
  CalendarCheck,
  Users,
  ImageIcon,
  Home,
} from "lucide-react";

export default function AdminLayout({ children }: any) {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure this component only renders after mount to avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const navItems = [
    { title: "Add Course", href: "/0213A/admin/addcourse", icon: PlusCircle },
    { title: "All Courses", href: "/0213A/admin/allcourse", icon: BookOpen },
    { title: "Manage Events", href: "/0213A/admin/manageevent", icon: CalendarCheck },
    { title: "Manage Users", href: "/0213A/admin/manageusers", icon: Users },
    { title: "Update Banner", href: "/0213A/admin/updatebanner", icon: ImageIcon },
    { title: "Home", href: "/", icon: Home },
  ];

  if (!mounted) return null; // Prevent SSR hydration errors

  return (
    <div className="min-h-screen flex bg-[#f8f9fb] text-gray-900 overflow-hidden ">
      {/* Sidebar */}
      <div className="relative z-50">
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
          <h1
            className={`
            text-2xl font-bold mb-6 transition-all duration-300
            ${open ? "opacity-100" : "opacity-0 hidden"}
          `}
          >
            Admin Panel
          </h1>

          {/* Menu */}
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
                  <Icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition" />
                  <span className={`${open ? "opacity-100" : "opacity-0 hidden"} transition-all`}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
      {/* Main Content */}
      <div className="min-h-screen w-full relative flex-1 z-20">
        {/* Noise Texture (Darker Dots) Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Your Content/Components */}
        <main className=" p-10 text-gray-900 z-50 relative ">{children}</main>
      </div>

    </div>
  );
}
