/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getPublicCourseDetailsServer } from "@/actions/coursepublic/getCourseDetails";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getUserInfoServer } from "@/actions/auth/getUserInfo";
import { UserInfo } from "@/actions/auth/user.interface";


export default function EnrollPage() {
    const params = useParams();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [terms, setTerms] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
    const [user, setUser] = useState<UserInfo>();


    


    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await getUserInfoServer(); // call server function
            setUser(userInfo);
        };

        fetchUser();
    }, []);
    useEffect(() => {
        async function fetch() {
            try {
                const data = await getPublicCourseDetailsServer(courseId);
                setCourse(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [courseId]);

    const handlePayment = async () => {
        console.log("payment");
    };

    if (loading) return <p className="text-center py-20">Loading...</p>;
    if (!course) return <p className="text-center py-20">Course not found.</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 font-poppins">

            <h1 className="text-3xl md:text-4xl font-bold mb-10">Checkout</h1>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT: COURSE INFO */}
                <div className="space-y-6 bg-white border rounded-2xl shadow-lg p-6 h-fit">

                    <h2 className="text-2xl font-semibold mb-4">Course Information</h2>

                    <Image
                        src={course.banner}
                        width={600}
                        height={400}
                        alt="course banner"
                        className="w-full rounded-xl shadow"
                    />

                    <h3 className="text-xl font-bold">{course.title}</h3>

                    <p className="text-gray-600">{course.description}</p>

                    <div>
                        <p className="text-3xl font-bold text-gray-900">
                            {course.discountedPrice
                                ? `${course.discountedPrice} BDT`
                                : `${course.price} BDT`}
                        </p>
                        {course.discountedPrice && (
                            <p className="line-through text-gray-500">
                                {course.price} BDT
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT: USER INFO + PAYMENT */}
                <div className="space-y-6 bg-white border rounded-2xl shadow-xl p-6 h-fit">

                    {/* USER INFO */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Information</h2>

                        <div className="space-y-2 text-gray-700">
                            <p><strong>Name:</strong> {user?.name || 'User Name Not Found'}</p>
                            <p><strong>Email:</strong> {user?.email || 'User Email Not Found'}</p>
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    {/* PAYMENT METHOD */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

                        <div
                            onClick={() => setPaymentMethod("sslcommerz")}
                            className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition shadow-sm hover:shadow-md
            ${paymentMethod === "sslcommerz" ? "border-indigo-500 ring-2 ring-indigo-300" : "border-gray-300"}
        `}
                        >

                            <div>
                                <p className="font-semibold text-gray-800">SSLCommerz</p>
                                <p className="text-sm text-gray-500">Pay securely using Debit/Credit, bKash, Nagad & more</p>
                            </div>

                            {/* Selected checkmark */}
                            {paymentMethod === "sslcommerz" && (
                                <span className="ml-auto text-indigo-600 font-bold text-lg">✔</span>
                            )}
                        </div>
                    </div>


                    {/* TERMS */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={terms}
                            onChange={() => setTerms(!terms)}
                            className="w-5 h-5"
                        />
                        <p className="text-sm text-gray-700">
                            I agree to the{" "}
                            <span className="underline cursor-pointer text-indigo-600">
                                Terms & Conditions
                            </span>
                        </p>
                    </div>

                    {/* PROCEED BUTTON */}
                    <button
                        onClick={handlePayment}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                        hover:opacity-90 text-white text-lg font-semibold rounded-xl shadow-lg transition"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}
