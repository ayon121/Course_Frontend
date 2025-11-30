"use client";

import { loginUser } from "@/actions/auth/loginUser";
import { useState } from "react";
import { toast } from "sonner";


export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData: FormData) => {
        setLoading(true);

        const result = await loginUser(null,formData);

        // If loginUser triggers redirect, this won't run.
        // Only runs on validation error or wrong credentials.
        if (result?.success === false) {
            toast.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white text-gray-800 shadow-xl rounded-2xl p-8">
                
                <h2 className="text-3xl font-bold text-center mb-6 ">
                    Login
                </h2>

                <form action={handleLogin} className="space-y-5">
                    
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm ">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-3 rounded-xl border border-gray-300 bg-transparent "
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm ">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-3 rounded-xl border border-gray-300 bg-transparent "
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Redirect param (hidden) */}
                    <input type="hidden" name="redirect" value="" />

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 rounded-xl bg-black  text-white  font-medium hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center text-sm  mt-4 ">
                    Don’t have an account? <a href="/register" className="font-bold">Register</a>
                </div>
            </div>
        </div>
    );
}
