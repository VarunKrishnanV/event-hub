import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { events } from '../lib/constants';


const page = () => {
  return (
    <section className='mt-20 p-8'>
      <h1 className='text-center'>The Hub for Every Dev <br /> Event you can't miss</h1>
      <p className='text-center mt-5'>Hackathos, Meetups and conference, All in one place</p>
      <ExploreBtn />

      <div id='events' className='mt-20 space-y-7'>
        <h2>Featured Events</h2>

        <ul className="events list-none">
          {
            events.map(event => (
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

export default page