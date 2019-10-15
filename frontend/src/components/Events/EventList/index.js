import React from 'react'

import { EventItem } from './parts'

import './styles.css'

function EventList(props) {
  const events = props.events.map(event => (
    <EventItem key={event._id} event={{ title: event.title, price: event.price, creatorId: event.creator._id }} userId={props.authUserId} />
  ))

  return <ul className='events__list'>{events}</ul>
}

export default EventList
