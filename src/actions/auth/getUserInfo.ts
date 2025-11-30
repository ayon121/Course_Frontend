/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "./tokenHandlers";

import jwt, { JwtPayload } from "jsonwebtoken";



export const getUserInfoServer = async () => {
    let userInfo
    try {

        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            return { id: "", name: "Unknown User", email: "", role: "USER" };
        }

        const response = await fetch(`http://localhost:5000/api/v1/user/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accesstoken=${accessToken}`,
            },
        });


        const result = await response.json();

        if (result.success) {
            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.doctor?.name || result.data.patient?.name || result.data.name || "Unknown User",
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "USER",
        };
    }

}