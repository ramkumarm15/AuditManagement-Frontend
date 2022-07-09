import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const NavbarPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("access");
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };

  let name = "Login";

  if (localStorage.getItem("isLoggedIn")) {
    name = "Logout";
  }
  console.log(typeof localStorage.getItem("isLoggedIn"));

  return (
    <>
      <Navbar variant="light" className="topnav shadow-sm py-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="font-weight-bold">
            Audit Management System
          </Navbar.Brand>
          
        </Container>
        <Nav className="ms-auto">
            {localStorage.getItem("isLoggedIn") === "true" ? (
              <>
                <a className="btn btn-primary text-white" onClick={handleClick}>Logout</a>
              </>
            ) : (
              <>
                <Link className="btn btn-primary text-white" to="/login">Login</Link>
              </>
            )}
          </Nav>
      </Navbar>
    </>
  );
};
