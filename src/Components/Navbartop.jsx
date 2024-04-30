import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Navbartop() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      window.location.href = `/search/${search}`; // Navigate programmatically
    }
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Link className="nav-link" to="/">
            {" "}
            <Navbar.Brand href="/">
              <img src="logo2.png" className="w-25 toplogo" alt="" />
            </Navbar.Brand>
          </Link>

          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/allUsers">
              Users
            </Link>
            <Link className="nav-link" to="/category">
              Categories
            </Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Cerca articolo
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
