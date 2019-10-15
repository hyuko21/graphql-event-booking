import React from 'react'

import './styles.css'

const EventItem = ({ event, userId }) => (
  <li className='events__list-item'>
    <div>
      <h1>{event.title}</h1>
      <h2>{event.price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}</h2>
    </div>
    <div>
      {userId === event.creatorId ? (
        <p>You own this event</p>
      ) : (
        <button className='btn'>View Details</button>
      )}
    </div>
  </li>
)

export default EventItem
