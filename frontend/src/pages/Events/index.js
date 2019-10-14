import React, { useState } from 'react'

import Modal from '../../components/Modal'
import Backdrop from '../../components/Backdrop'

import './styles.css'

function EventsPage() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)

  const startCreatingEvent = () => {
    setIsCreatingEvent(true)
  }

  const modalConfirmHandler = () => {
    setIsCreatingEvent(false)
  }

  const modalCancelHandler = () => {
    setIsCreatingEvent(false)
  }

  return (
    <>
      {isCreatingEvent && (
        <>
          <Backdrop />
          <Modal title='Add Event' onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
            <p>Modal Content</p>
          </Modal>
        </>
      )}
      <div className='events-control'>
        <p>Share your own Events!</p>
        <button className='btn' onClick={startCreatingEvent}>
          Create Event
        </button>
      </div>
    </>
  )
}

export default EventsPage
