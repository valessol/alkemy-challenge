import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useHistory } from "react-router";

const NavBar = () => {
    const { currentUser, logOut } = useContext(AuthContext)
    const { push } = useHistory()

    const handleLogOut = () => {
        logOut()
        push('/')
    }

    return (
        <Navbar className="navBar" expand="md">
            <Container fluid>

                <Link exact to="/">
                    <Navbar.Brand className="title1" style={{color: 'white'}} >SuperHero Team</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
                    <Nav
                        className="title3  align-items-center"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink 
                            exact
                            to="/"
                            style={{color: 'white'}} 
                            className="mx-4  navBar--links" 
                            activeClassName="navBar--active"
                        >
                            team
                        </NavLink>

                        <NavLink 
                            exact
                            to="/heros"
                            style={{color: 'white'}} 
                            className="mx-4 navBar--links"
                            activeClassName="navBar--active"
                        >
                            búsqueda
                        </NavLink>
                        {
                            currentUser &&
                                <Button 
                                    onClick={handleLogOut}
                                    className="button button--secondary mx-4 my-0" 
                                >
                                    Log out
                                </Button>
                        }
                        
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}

export default NavBar
