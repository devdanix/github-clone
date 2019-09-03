import React, { Component } from "react";

import { Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class NavbarCustom extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <LinkContainer to="/">
            <NavItem>Github Clone</NavItem>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavbarCustom;
