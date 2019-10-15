import React from 'react'

import AuthContext from './auth-context'
import EventsContext from './events-context'

const AppContext = ({ store, children }) => (
  <AuthContext.Provider value={store.auth}>
    <EventsContext.Provider value={store.events}>{children}</EventsContext.Provider>
  </AuthContext.Provider>
)

export default AppContext
