import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800 // every half hour, regenerate this page for incoming requests
    }
}

export default HomePage;
