import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar className="navBar" expand="md">
            <Container fluid>

                <Link exact to="/">
                    <Navbar.Brand className="title1" style={{color: 'white'}} >SuperHero Team</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
                    <Nav
                        className="title3"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link 
                            exact
                            to="/"
                            style={{color: 'white'}} className="navBar__link mx-4" 
                        >
                            team
                        </Link>

                        <Link 
                            exact
                            to="/heros"
                            style={{color: 'white'}} className="navBar__link mx-4"
                        >
                            búsqueda
                        </Link>

                        <Link 
                            exact
                            to="/"
                            style={{color: 'white'}} className="navBar__link mx-4" 
                        >
                            Log out
                        </Link>
                        
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}

export default NavBar
