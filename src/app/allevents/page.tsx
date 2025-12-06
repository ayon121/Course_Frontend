import EventList from "@/component/event/EventList";
import PublicNavbar from "@/component/shared/publicComponents/PublicNavbar";


const AllEventspage = () => {
    return (
        <div>
            <PublicNavbar></PublicNavbar>
            <EventList></EventList>
        </div>
    );
};

export default AllEventspage;