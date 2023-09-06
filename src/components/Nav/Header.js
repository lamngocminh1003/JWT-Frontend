import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/image/logo512.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="info"
      >
        <Container>
          <Navbar.Brand to="/">
            {" "}
            <img
              alt="Logo ReactJS"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link" exact>
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item to="/action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item to="/action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item to="/action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item to="/action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Navbar.Text>Signed in as: Amie</Navbar.Text>{" "}
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
