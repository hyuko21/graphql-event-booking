import React, { useContext, useEffect } from 'react'

import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import BookingList from '../../components/Bookings/BookingList'

import BookingsContext from '../../context/bookings-context'

import './styles.css'

function BookingsPage() {
  const bookingsContext = useContext(BookingsContext)

  useEffect(() => {
    bookingsContext.getBookings()
  }, [])

  const onCancelBooking = async bookingId => {
    await bookingsContext.cancelBooking(bookingId)
  }

  if (bookingsContext.isLoading) {
    return <Spinner />
  }

  return (
    <div className='bookings'>
      <h1>My bookings</h1>
      {bookingsContext.errors ? <Error errors={bookingsContext.errors} /> : null}
      <BookingList bookings={bookingsContext.bookings} onDelete={onCancelBooking} />
    </div>
  )
}

export default BookingsPage
