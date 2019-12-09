import React, { useState, useRef, useContext, useEffect } from 'react'

import Modal from '../../components/Modal'
import Backdrop from '../../components/Backdrop'
import Spinner from '../../components/Spinner'
import EventList from '../../components/Events/EventList'

import AuthContext from '../../context/auth-context'
import EventsContext from '../../context/events-context'

import './styles.css'

function EventsPage() {
  const authContext = useContext(AuthContext)
  const eventsContext = useContext(EventsContext)

  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const titleRef = useRef(null)
  const priceRef = useRef(null)
  const dateRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    eventsContext.getEvents()
  }, [isCreatingEvent])

  const startCreatingEvent = () => {
    setIsCreatingEvent(true)
  }

  const modalConfirmHandler = async () => {
    const title = titleRef.current.value
    const price = +priceRef.current.value
    const date = dateRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim() || price <= 0 || !date.trim() || !description.trim()) {
      return
    }

    const event = { title, price, date, description }

    await eventsContext.createEvent(event)

    setIsCreatingEvent(false)
  }

  const modalCancelHandler = () => {
    setIsCreatingEvent(false)
    setSelectedEvent(null)
  }

  const bookEventHandler = () => {}

  const showDetailHandler = eventId => {
    const event = eventsContext.events.find(e => e._id === eventId)

    if (event) {
      setSelectedEvent(event)
    }
  }

  return (
    <>
      {(isCreatingEvent || selectedEvent) && <Backdrop onClick={modalCancelHandler} />}
      {isCreatingEvent && (
        <Modal title='Add Event' onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
          <form>
            <div className='form-control'>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title' ref={titleRef} />
            </div>
            <div className='form-control'>
              <label htmlFor='price'>Price</label>
              <input type='number' id='price' ref={priceRef} />
            </div>
            <div className='form-control'>
              <label htmlFor='date'>Date</label>
              <input type='datetime-local' id='date' ref={dateRef} />
            </div>
            <div className='form-control'>
              <label htmlFor='description'>Description</label>
              <textarea id='description' ref={descriptionRef} rows={5} maxLength={200}></textarea>
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal title='Event Details' onCancel={modalCancelHandler} onConfirm={bookEventHandler} confirmText='Book'>
          <h1>{selectedEvent.title}</h1>
          <h1>
            {selectedEvent.price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })} -&nbsp;
            {new Date(selectedEvent.date).toDateString()}
          </h1>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {authContext.token && (
        <div className='events-control'>
          <p>Share your own Events!</p>
          <button className='btn' onClick={startCreatingEvent}>
            Create Event
          </button>
        </div>
      )}
      {eventsContext.isLoading ? (
        <Spinner />
      ) : (
        <EventList events={eventsContext.events} authUserId={authContext.userId} onViewDetail={showDetailHandler} />
      )}
    </>
  )
}

export default EventsPage
