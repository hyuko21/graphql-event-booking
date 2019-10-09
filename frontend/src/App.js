import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import Navigation from './components/Navigation'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className='main-content'>
        <Switch>
          <Redirect from='/' to='/auth' exact />
          <Route path='/auth' component={AuthPage} />
          <Route path='/events' component={EventsPage} />
          <Route path='/bookings' component={BookingsPage} />
          <Redirect from='*' to='/' exact />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App