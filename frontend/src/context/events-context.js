import React from 'react'

export default React.createContext({
  events: [],
  createEvent: eventData => {},
  getEvents: () => {},
  isLoading: false
})
