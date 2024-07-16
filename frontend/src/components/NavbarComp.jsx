import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiSolidBookAdd } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavbarComp() {
  return (
    <Navbar expand="lg" className="bg-subtle">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="https://cdn-icons-png.freepik.com/512/8132/8132217.png"
            width={40}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto fw-bold">
            <Link to="/add">
              <BiSolidBookAdd size={28} className="ms-2" />
              Add Book
            </Link>
            <Link to="/favorites">
              <MdBookmarkAdd size={28} className="ms-2" />
              Favorites
            </Link>
            <Link to="/search">
              <FaSearch size={24} className="ms-2" />
              Search
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
