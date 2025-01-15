import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { IoIosLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';



const NavbarComponent = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
        // Hapus data di localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    
        // Redirect ke halaman login
        navigate('/login');
    };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <strong>FOOD SHOP!</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {/*=================== service ========================================================== */}
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/products">
                Product List
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/details">
                Transaction
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="">
                Sales Statistics
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="dark" className="text-end br-10" onClick={handleLogout}>
            <IoIosLogOut />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
