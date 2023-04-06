import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import '../stylesheets/NavBar.css'
import { myContext } from '../App'
import cookie from 'cookie'

const NavBar = () => {
  const navigate = useNavigate()
  const { cookies , setCookies} = useContext(myContext);

  const handleLogout = () => {
    fetch('http://localhost:3001/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === true) {
          console.log(data);
        } else {
          console.log(data);
          setCookies(cookie.parse(document.cookie));
          navigate('/');
        }
      });
  }

  return (
    <Navbar bg="dark" variant="dark" className='navbar-main'>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>MacroCenter</Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          {cookies.auth ? <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link> : <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>}
          {cookies.auth ? <Nav.Link onClick={() => navigate('/personal')}>Personal Inventory</Nav.Link> : null}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar