import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";



export function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('authToken');
        navigate('/uitloggen');
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                <img src="/logo-dyflexis-2.svg" className="w-50" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/vragenlijsten">Vragenlijsten</NavLink>
                        <NavLink className="nav-link" to="/leden">Leden</NavLink>
                        <NavLink className="nav-link" to="/teams">Teams</NavLink>
                        <NavLink className="nav-link" to="/rapportage">Rapportage</NavLink>
                        <NavLink className="nav-link" to="/vragen">Vragen</NavLink>
                        <NavLink className="nav-link" to="/antwoorden">Antwoorden</NavLink>
                    </Nav>
                </Navbar.Collapse>
                <div className="account">
                    <div className="user">
                        <span className="material-icons">person</span>
                        <span className="loggedInUser"></span>
                    </div>
                    <Nav.Link onClick={handleLogout}>Uitloggen</Nav.Link>
                </div>
            </Container>
        </Navbar>
    );
}