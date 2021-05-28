import {Fragment} from 'react';
import {useRouter} from "next/router";

import {getEventById} from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = () => {
    const router = useRouter();

    // Has dynamic path segments as key
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return <p>No event found!</p>;
    }
    return (
        <>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    );
};

export default EventDetailPage;
