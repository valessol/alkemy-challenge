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
        <Navbar className="navBar">
            <Container fluid className="d-flex navBar__container">

                <Link exact to="/">
                    <Navbar.Brand className="title1 navBar__title" style={{color: 'white'}} >SuperHero Team</Navbar.Brand>
                </Link>

                <Nav
                    className="title3  align-items-center  navBar--mobile"
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
                                className="button button--secondary mx-4 my-0 navBar__btn" 
                            >
                                Log out
                            </Button>
                    }
                    
                </Nav>

            </Container>
            </Navbar>
    )
}

export default NavBar
