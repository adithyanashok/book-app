import React from 'react'
import './NavBar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
const NavBar = () => {  
  const {currentUser} = useSelector((state) => state?.user)
  return (
    <Navbar className='navbar' expand="lg">
      <Container fluid>
        <Navbar.Brand style={{ color: 'white', textDecoration: 'none' }} href="/">The Library</Navbar.Brand>
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
          {
            currentUser ? <a style={{ color:'inherit', textDecoration:'none'}} href='/login'>{currentUser?.name}</a> : <a style={{ color:'inherit', textDecoration:'none'}} href='/login'>Signin for free</a>
          }
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar