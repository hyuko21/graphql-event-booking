import React from 'react'

export default React.createContext({
  errors: null,
  token: null,
  userId: null,
  createUser: userData => {},
  login: loginData => {},
  logout: () => {},
})
