import React from 'react'

import { EventItem } from './components'

import './styles.css'

const EventList = props => {
  const events = props.events.map(event => (
    <EventItem key={event._id} event={{ ...event, creatorId: event.creator._id }} userId={props.authUserId} onClickDetail={props.onViewDetail} />
  ))

  return <ul className='events__list'>{events}</ul>
}

export default EventList
