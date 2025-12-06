"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getBannerServer } from "@/actions/banner/getbanner";


interface BannerItem {
    url: string;
    link?: string;
}

export default function Banner() {
    const [banners, setBanners] = useState<{ photo: string; link: string }[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadBanners = async () => {
            try {
                const res = await getBannerServer();


                console.log(res);

                setBanners(res.photos.map((item: BannerItem) => ({
                    photo: item.url,
                    link: item.link || "#",
                })));

            } catch (err) {
                console.log("Banner Load Error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBanners();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-2 mt-4 mb-1">
            <div className="flex flex-col gap-2 px-3 justify-center items-center">
                <div className="w-full h-full md:h-2/4">
                    {loading ? (
                        // Skeleton Loader
                        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden">
                            <div className="h-full w-full bg-base-200 animate-pulse rounded-2xl flex items-center justify-center">
                                <div className="w-3/4 h-3/4 bg-gray-300/50 rounded-xl"></div>
                            </div>

                            {/* Fake navigation arrows */}
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between px-2">
                                <div className="w-10 h-10 bg-gray-300/50 rounded-full animate-pulse"></div>
                                <div className="w-10 h-10 bg-gray-300/50 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="carousel w-full">
                            {banners.map((banner, index) => (
                                <div
                                    key={index}
                                    id={`slide${index + 1}`}
                                    className="carousel-item relative w-full"
                                >
                                    <a
                                        href={banner.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={banner.photo}
                                            alt={`Banner ${index + 1}`}
                                            width={2200}
                                            height={1900}
                                            className="rounded-2xl object-fill"
                                            loading="lazy"
                                        />
                                    </a>

                                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-2/5 transform justify-between">
                                        <a
                                            href={`#slide${index === 0 ? banners.length : index
                                                }`}
                                            className="p-1 md:p-3 rounded-full text-white bg-main border-main border-2 hover:border-main hover:bg-white hover:text-main"
                                        >
                                            ❮
                                        </a>

                                        <a
                                            href={`#slide${index + 2 > banners.length ? 1 : index + 2
                                                }`}
                                            className="p-1 md:p-3 rounded-full text-white bg-main border-main border-2 hover:border-main hover:bg-white hover:text-main"
                                        >
                                            ❯
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
