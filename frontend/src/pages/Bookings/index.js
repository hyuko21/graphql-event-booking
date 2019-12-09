import React, { useContext, useEffect } from 'react'

import Spinner from '../../components/Spinner'

import BookingsContext from '../../context/bookings-context'

function BookingsPage() {
  const bookingsContext = useContext(BookingsContext)

  useEffect(() => {
    bookingsContext.getBookings()
  }, [])

  if (bookingsContext.isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h1>The Bookings Page</h1>
      <ul>
        {bookingsContext.bookings.map(booking => (
          <li key={booking._id}>
            {booking.event.title} - {new Date(booking.createdAt).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookingsPage
