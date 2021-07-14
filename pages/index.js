// special component you can add anywhere
// Next will inject things inside head into the page
import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {

  return (
    <div>
        <Head>
            <title>NextJS Events</title>
            <meta name="description" content="Find your events to take you to the next level"/>
        </Head>
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
