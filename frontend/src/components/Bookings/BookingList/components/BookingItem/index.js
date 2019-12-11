import React from 'react'

import './styles.css'

const BookingItem = ({ booking, onDelete }) => (
  <li className='bookings__list-item'>
    <div className='bookings__list-item-data'>
      {booking.event.title} -&nbsp;
      {new Date(booking.createdAt).toDateString()}
    </div>
    <div className='bookings__list-item-actions'>
      <button className='btn' onClick={() => onDelete(booking._id)}>
        Cancel
      </button>
    </div>
  </li>
)

export default BookingItem
