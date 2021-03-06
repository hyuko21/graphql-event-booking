import React from 'react'

import './styles.css'

const Modal = props => (
  <div className='modal'>
    <header className='modal__header'>
      <h1>{props.title}</h1>
    </header>
    <section className='modal__content'>{props.children}</section>
    <section className='modal__actions'>
      {props.onCancel && (
        <button className='btn' onClick={props.onCancel}>
          {props.cancelText || 'Cancel'}
        </button>
      )}
      {props.onConfirm && (
        <button className='btn' onClick={props.onConfirm}>
          {props.confirmText || 'Confirm'}
        </button>
      )}
    </section>
  </div>
)

export default Modal
