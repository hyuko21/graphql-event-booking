import React, { useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import Navigation from './components/Navigation'

import AppContext from './context/app-context'

import './App.css'

import authApi from './services/api/auth'
import eventsApi from './services/api/events'

const INITIAL_STATE = {
  auth: {
    errors: null,
    userId: null,
    token: null,
  },
  events: {
    errors: null,
    events: [],
    isLoading: false,
  },
}

function App() {
  const [authState, setAuthState] = useState(INITIAL_STATE.auth)
  const [eventsState, setEventsState] = useState(INITIAL_STATE.events)

  const auth = {
    ...authState,

    async createUser(userData) {
      return authApi.createUser(userData)
    },

    async login(loginData) {
      const result = await authApi.login(loginData)

      if (result.errors) {
        setAuthState({
          ...INITIAL_STATE.auth,
          errors: result.errors
        })
      } else {
        setAuthState(result.data.login)
      }
    },

    logout() {
      setAuthState(INITIAL_STATE.auth)
    },
  }

  const events = {
    ...eventsState,

    async createEvent(eventData) {
      const currentEvents = eventsState.events

      setEventsState({ isLoading: true })

      const result = await eventsApi.createEvent(eventData, auth.token)

      setEventsState({ events: [...currentEvents, result.data.createEvent], isLoading: false })
    },

    async getEvents() {
      setEventsState({ isLoading: true })

      const result = await eventsApi.events()

      setEventsState({ events: result.data.events, isLoading: false })
    },
  }

  const store = {
    auth,
    events,
  }

  return (
    <BrowserRouter>
      <AppContext store={store}>
        <Navigation />
        <main className='main-content'>
          <Switch>
            <Redirect from='/' to='/events' exact />
            <Route path='/events' component={EventsPage} />
            {!authState.token ? (
              <Route path='/auth' component={AuthPage} />
            ) : (
              <Route path='/bookings' component={BookingsPage} />
            )}
            <Redirect from='*' to='/' exact />
          </Switch>
        </main>
      </AppContext>
    </BrowserRouter>
  )
}

export default App
