import React, { useState } from 'react'

import './styles.css'

import auth from '../../config/api/auth'

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const switchModeHandler = () => {
    setIsLogin(!isLogin)
  }

  const submitHandler = async event => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      return
    }

    const result = await auth[isLogin ? 'login' : 'createUser']({ email, password })
  }

  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
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
