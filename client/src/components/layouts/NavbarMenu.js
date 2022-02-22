import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import LogoNav from '../../assets/logo-nav2.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { AuthContext } from '../../contexts/AuthContext'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { BsBoxArrowLeft } from "react-icons/bs";

const NavbarMenu = () => {
    const {authState: {isAuthenticated, user}, logoutUser} = useContext(AuthContext)
    const [showToast, setToast] = useState(isAuthenticated);
    const toggleShowA = () => setToast(!showToast)
    useEffect(() => setTimeout(() => setToast(false), 1500), [showToast])
    const logout = () => {
        logoutUser()
    }
    return (
        <>
            <ToastContainer position="top-end" className="p-3 in-top">
                <Toast show={showToast} onClose={toggleShowA}>
                    <Toast.Header style={{background: '#dc3545'}}>
                        <strong className="me-auto text-white">Admin</strong>
                        <small className="text-white">just recently</small>
                    </Toast.Header>
                    <Toast.Body>Login successfully</Toast.Body>
                </Toast>
            </ToastContainer>     
            <Navbar bg="success" expand="lg" variant='dark' className='shadow navbar-menu'>
                <Navbar.Brand className="font-weight-bolder text-white">
                    <img src={LogoNav} width='35' height='35' className='mr-2' />
                    LearnIt
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='font-weight-bolder text-white' to='/dasboard' as={Link}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav className="d-flex mr-20">
                        <Nav.Link className='font-weight-bolder text-white' disable="true">
                            Wellcome {user ? user.username : ''}
                        </Nav.Link>
                        <Button 
                            variant='danger' 
                            className='font-weight-bolder text-white'
                            onClick={logout}
                        >
                            <BsBoxArrowLeft className='mr-2 mb-1' />Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>   
        </>
    )
}

export default NavbarMenu