import React from 'react'

export default React.createContext({
  errors: null,
  events: [],
  createEvent: eventData => {},
  getEvents: () => {},
  isLoading: false
})
