import React from 'react'
import '../stylesheets/LoginPage.css'
import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DismissableAlert } from './DismissableAlert'
import { myContext } from '../App'
import cookie from 'cookie'

const LoginPage = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('login')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', error: false })
  const { setCookies } = useContext(myContext);
  const newAccount = useRef({})

  const handleLogin = () => {
    fetch('http://localhost:3001/login', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Username': username,
        'Password': password
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === true) {
          setAlert(data);
        } else {
          setCookies(cookie.parse(document.cookie));
          navigate('/personal');
        }
      });
  }

  const handleRegister = () => {
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount.current)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === true) {
          setAlert(data);
        } else {
          setDisplay('login');
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  if (display === 'login') {
    return (
      <div className='vw-100 h-75 d-flex justify-content-center align-items-center'>
        <form className='mt-3 py-4 bg-dark text-light login-form d-flex justify-content-center align-items-center flex-column' onSubmit={handleSubmit}>
          <h3>Login</h3>
          <p>New here? Register <span className='text-primary hover-effect' onClick={() => setDisplay('register')}>here</span></p>
          <div className='form-group w-75'>
            <label>Username</label>
            <input type='text' className='form-control mb-2' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
            <label>Password</label>
            <input type='password' className='form-control mb-2' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
            {alert.message !== '' ? <DismissableAlert alert={alert} setAlert={setAlert} /> : null}
          </div>
        </form>
      </div>
    )
  } else if (display === 'register') {
    return (
      <div className='vw-100 h-75 d-flex justify-content-center align-items-center'>
        <form className='mt-3 py-4  bg-dark text-light login-form d-flex justify-content-center align-items-center flex-column'>
          <h3>Register</h3>
          <p>Already registered? Login <span className='text-primary hover-effect' onClick={() => setDisplay('login')}>here</span></p>
          <div className='form-group w-75'>
            <label>First Name</label>
            <input type='text' className='form-control mb-2' placeholder='first name' onChange={(e) => {newAccount.current.firstName = e.target.value}}/>
            <label>Last Name</label>
            <input type='text' className='form-control mb-2' placeholder='last name' onChange={(e) => {newAccount.current.lastName = e.target.value}}/>
            <label>Username</label>
            <input type='text' className='form-control mb-2' placeholder='username' onChange={(e) => {newAccount.current.username = e.target.value}}/>
            <label>Password</label>
            <input type='text' className='form-control mb-2' placeholder='password' onChange={(e) => {newAccount.current.password = e.target.value}}/>
            <button type='submit' className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
            {alert.message !== '' ? <DismissableAlert alert={alert} setAlert={setAlert} /> : null}
          </div>
        </form>
      </div>
    )
  }

}

export default LoginPage