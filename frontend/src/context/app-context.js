import React from 'react'

import AuthContext from './auth-context'
import EventsContext from './events-context'
import BookingsContext from './bookings-context'

const AppContext = ({ store, children }) => (
  <AuthContext.Provider value={store.auth}>
    <EventsContext.Provider value={store.events}>
      <BookingsContext.Provider value={store.bookings}>{children}</BookingsContext.Provider>
    </EventsContext.Provider>
  </AuthContext.Provider>
)

export default AppContext
