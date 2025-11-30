import { getCookie, setCookie, deleteCookie } from "./tokenHandlers";

export const getNewAccessToken = async (): Promise<string | null> => {
    try {
        const refreshToken = await getCookie("refreshToken"); // await needed

        if (!refreshToken) return null;

        const res = await fetch(
            `http://localhost:5000/api/v1/auth/refresh-token`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    Cookie: `refreshtoken=${refreshToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return null;
        }

        const data = await res.json();

        if (data?.accesstoken) {
            await setCookie("accessToken", data.accesstoken, {
                httpOnly: true,
                secure: true,
                path: "/",
                maxAge: 60 * 60, // 1 hour
            });
        }

        return data?.accessToken || null;
    } catch (err) {
        console.error("getNewAccessToken error:", err);
        return null;
    }
};
