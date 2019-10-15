import React, { useState, useRef, useContext } from 'react'

import AuthContext from '../../context/auth-context'

import './styles.css'

function AuthPage() {
  const authContext = useContext(AuthContext)

  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [isLogin, setIsLogin] = useState(true)

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

    if (isLogin) {
      return authContext.login({ email, password })
    }

    await authContext.createUser({ email, password })
    switchModeHandler()
  }

  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
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
