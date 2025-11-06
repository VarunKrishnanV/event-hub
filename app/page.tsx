import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Page = async () => {

  'use cache';
  cacheLife('hours')
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section className='mt-20 p-8'>
      <h1 className='text-center'>The Hub for Every Dev <br /> Event you can&apos;t miss</h1>
      <p className='text-center mt-5'>Hackathos, Meetups and conference, All in one place</p>
      <ExploreBtn />

      <div id='events' className='mt-20 space-y-7'>
        <h2>Featured Events</h2>

        <ul className="events list-none">
          {
            events && events.length > 0 && events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))
          }
        </ul>

      </div>
    </section>
  )
}

export default Page