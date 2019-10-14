import React, { useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import Navigation from './components/Navigation'

import AuthContext from './context/auth-context'

import './App.css'

const INITIAL_STATE = {
  userId: null,
  token: null,
  tokenExpiration: null,
}

function App() {
  const [authState, setAuthState] = useState(INITIAL_STATE)

  const login = loginData => setAuthState(loginData)
  const logout = () => setAuthState(INITIAL_STATE)

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...authState, login, logout }}>
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
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
