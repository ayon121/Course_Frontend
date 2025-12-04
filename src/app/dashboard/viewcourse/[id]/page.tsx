"use client"
import PurchasedCourseClient from "@/component/studentdashbaord/PurchasedCourseClient";
import { useParams } from "next/navigation";



export default function CoursePage() {
    const params = useParams();
    const courseId = params?.id as string;

    return <PurchasedCourseClient courseId={courseId} />;
}