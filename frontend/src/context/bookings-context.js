import React from 'react'

export default React.createContext({
  errors: null,
  bookings: [],
  bookEvent: eventId => {},
  cancelBooking: bookingId => {},
  getBookings: () => {},
  isLoading: false,
})
