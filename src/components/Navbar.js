import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Move inside the component
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Clear role on logout
    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={currentPath === "/login" || currentPath === "/register" ? "d-none" : ""}
    >
      <div className="container">
        <Navbar.Brand as={Link} to="/">Alzheimer MRI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {role === "ADMIN" && (
              <>
                  <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
                  <Nav.Link as={Link} to="/activity-logs">Activity Logs</Nav.Link>
              </>
            )}

            {token ? (
              <>
                <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
                <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
