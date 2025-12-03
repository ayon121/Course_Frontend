"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { registerUser } from "@/actions/auth/registerUser";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full p-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-50"
        >
            {pending ? "Creating Account..." : "Register"}
        </button>
    );
}

export default function RegisterPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [state, formAction] = useActionState(registerUser, null);

    // Password Strength Logic
    const getPasswordStrength = () => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthLabel = ["Weak", "Fair", "Good", "Strong"];

    // Client-side validation before sending data to server
    const handleClientValidation = (formData: FormData) => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (getPasswordStrength() < 2) {
            toast.error("Your password is too weak.");
            return;
        }

        return formAction(formData); 
    };


    if (state?.success === false) {
        toast.error(state.message);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-2xl">
                <h2 className="text-2xl font-semibold text-center mb-6 text-black">
                    Create a New Account
                </h2>

                <form action={handleClientValidation} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="text-black font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full mt-2 px-4 py-2 rounded-lg border bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-black font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full mt-2 px-4 py-2 rounded-lg border bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-black font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-4 py-2 rounded-lg border bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        {password.length > 0 && (
                            <div className="mt-2 space-y-1">
                                <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 
                                        ${
                                            getPasswordStrength() === 1
                                                ? "w-1/4 bg-red-500"
                                                : getPasswordStrength() === 2
                                                ? "w-1/2 bg-yellow-500"
                                                : getPasswordStrength() === 3
                                                ? "w-3/4 bg-blue-500"
                                                : getPasswordStrength() === 4
                                                ? "w-full bg-green-500"
                                                : "w-0"
                                        }`}
                                    ></div>
                                </div>

                                <p className="text-sm text-black">
                                    Strength:{" "}
                                    <span className="font-medium">
                                        {strengthLabel[getPasswordStrength() - 1] ||
                                            "Very Weak"}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-black font-medium">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 px-4 py-2 rounded-lg border bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        {confirmPassword.length > 0 &&
                            password !== confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">
                                    Passwords do not match
                                </p>
                            )}
                    </div>

                    <SubmitButton />

                    <p className="text-center text-gray-600 text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="text-black font-bold">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
