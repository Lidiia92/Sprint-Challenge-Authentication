import React from "react";
import { Navbar, NavItem, Nav, NavDropdown, MenuItem  } from 'react-bootstrap';


/* Component */

const NavigationBar = props => {
    return (
      <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Home</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/login">
            Log in
          </NavItem>
          <NavItem eventKey={2} href="/register">
            Sign Up
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/jokes">
            Jokes
          </NavItem>
          <NavItem eventKey={1} href="#" onClick={props.signout}>
            Sign out
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  };
  
  export default NavigationBar;