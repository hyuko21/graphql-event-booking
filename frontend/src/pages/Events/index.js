import React, { useState, useRef, useContext, useEffect } from 'react'

import Modal from '../../components/Modal'
import Backdrop from '../../components/Backdrop'
import EventList from '../../components/Events/EventList'

import AuthContext from '../../context/auth-context'
import EventsContext from '../../context/events-context'

import './styles.css'

function EventsPage() {
  const authContext = useContext(AuthContext)
  const eventsContext = useContext(EventsContext)

  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const titleRef = useRef(null)
  const priceRef = useRef(null)
  const dateRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    eventsContext.getEvents()
  }, [])

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
  }

  return (
    <>
      {isCreatingEvent && (
        <>
          <Backdrop onClick={modalCancelHandler} />
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
        </>
      )}
      {authContext.token && (
        <div className='events-control'>
          <p>Share your own Events!</p>
          <button className='btn' onClick={startCreatingEvent}>
            Create Event
          </button>
        </div>
      )}
      <EventList events={eventsContext.events} authUserId={authContext.userId} />
    </>
  )
}

export default EventsPage
