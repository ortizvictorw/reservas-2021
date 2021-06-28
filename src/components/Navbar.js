import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export const Navbar_2 = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">IEPE</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/sabado-primera">Sabado Primera</Nav.Link>
          <Nav.Link href="/sabado-segunda">Sabado Segunda</Nav.Link>
          <Nav.Link href="/domingo-primera">Domingo Primera</Nav.Link>
          <Nav.Link href="/domingo-segunda">Domingo Segunda</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
