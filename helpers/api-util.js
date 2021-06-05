// Fetch all data and then filter on JS. Could do on firebase but just for this project
export async function getAllEvents() {
    const response = await fetch('https://nextjs-course-f4281-default-rtdb.firebaseio.com/events.json');
    const data = await response.json();

    const events = [];

    for (const key in data) {
        events.push({
            ...data[key]
        });
    }

    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}
