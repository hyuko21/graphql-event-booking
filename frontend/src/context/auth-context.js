import React from 'react'

export default React.createContext({
  token: null,
  userId: null,
  createUser: userData => {},
  login: loginData => {},
  logout: () => {},
})
