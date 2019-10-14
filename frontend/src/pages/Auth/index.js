import React, { useState, useRef, useContext } from 'react'

import AuthContext from '../../context/auth-context'

import './styles.css'

import auth from '../../config/api/auth'

function AuthPage() {
  const authContext = useContext(AuthContext)

  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [isLogin, setIsLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const switchModeHandler = () => {
    setIsLogin(!isLogin)
  }

  const submitHandler = async event => {
    event.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email.trim() || !password.trim()) {
      return
    }

    let result = null

    if (isLogin) {
      result = await auth.login({ email, password })

      if (result.errors) {
        return setErrorMessage(result.errors[0].message)
      }

      return authContext.login(result.data.login)
    }

    result = await auth.createUser({ email, password })
  }

  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>

      {errorMessage && <span className='error'>{errorMessage}</span>}

      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' ref={emailRef} />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' ref={passwordRef} />
      </div>
      <div className='form-actions'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={switchModeHandler}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </form>
  )
}

export default AuthPage
