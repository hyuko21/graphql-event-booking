import React from 'react'

export default React.createContext({
  errors: null,
  bookings: [],
  bookEvent: eventId => {},
  getBookings: () => {},
  isLoading: false,
})
