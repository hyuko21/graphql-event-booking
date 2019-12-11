import React from 'react'

import { BookingItem } from './components'

import './styles.css'

const BookingList = props => {
  const bookings = props.bookings.map(booking => (
    <BookingItem key={booking._id} booking={booking} onDelete={props.onDelete} />
  ))

  return <ul className='bookings__list'>{bookings}</ul>
}

export default BookingList
