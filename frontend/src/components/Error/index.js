import React from 'react'

import './styles.css'

const Error = props => (
  <ul className="error">
    {props.errors.map(error => <li className="error__item">{error.message}</li>)}
  </ul>
)

export default Error
