import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <header className="header">
      <Navbar variant="dark">
        <Navbar.Brand href="/">
          <h1>StudyResQ</h1>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/">Log Out</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
}

export default Header;
