"use client";

import EventDetailsPage from "@/component/event/EventDetails";
import PublicNavbar from "@/component/shared/publicComponents/PublicNavbar";
import { useParams } from "next/navigation";
const EventDetailspage = () => {
    const params = useParams();
    const id = params?.id as string;
    return (
        <div>
            <PublicNavbar></PublicNavbar>
            <EventDetailsPage id={id} />
        </div>
    );
};

export default EventDetailspage;