/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "../auth/tokenHandlers";

export interface CreateOrderPayload {
    courseId: string;
    paymentMethod: "SSLCOMMERCE" | string;
}

export const createOrder = async (payload: CreateOrderPayload) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        const response = await fetch(`http://localhost:5000/api/v1/order/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || data.success !== true) {
            throw new Error(data.message || "Failed to create order");
        }

        // Return full order + paymentURL
        return {
            success: true,
            order: data.data.order,
            paymentURL: data.data.paymentURL,
        };

    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create order",
        };
    }
};
