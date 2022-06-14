import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const NavBarElements = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Swapair</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Post">Post</Nav.Link>
          <Nav.Link href="/Profile">Profile</Nav.Link>
          <Nav.Link href="/Alert">Alert</Nav.Link>
          <Nav.Link href="/Signup">Signup</Nav.Link>
          <Nav.Link href="/Signin">Signin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarElements;
