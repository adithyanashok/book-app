import React, { useState } from 'react'
import './NavBar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {  
  const {currentUser} = useSelector((state) => state?.user)
  const navigate = useNavigate()
    const [q, setQuery] = useState('')
    // const handleLogout = () => {
    //   dispatch(logout())
    // }
  return (
    <Navbar className='navbar' expand="lg">
      <Container fluid>
        <Navbar.Brand style={{ color: 'white', textDecoration: 'none', fontFamily: 'Dangrek, cursive', fontSize: '35px' }} href="/">The Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" /> 
            
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link  href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link> */}
          </Nav>
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-primary" onClick={()=>navigate(`/search?q=${q}`)} >Search</Button>
          </Form>
          {
            currentUser ? <><Link className='signinbutton' to={'/profile'}><PersonIcon /></Link></> : <Link className='signinbutton' to={'/login'}>Login</Link>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar