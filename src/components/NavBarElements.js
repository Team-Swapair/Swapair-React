import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBarElements = () => {
  return (
    <Navbar variant="light">
      <Container>
        <Navbar.Brand href="/">Swapair</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/PostWrite">Post</Nav.Link>
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
