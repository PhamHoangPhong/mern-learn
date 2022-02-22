import React, {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from '../layouts/NavbarMenu'
const ProtectedRoute = () => {
    const {authState: {isAuthenticated, authLoading}} = useContext(AuthContext)

    if (authLoading)
        return (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation="border" variant="info" />
            </div>
        )
    return (
        <>
            <NavbarMenu />
            {isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
        </>
        
    )
}

export default ProtectedRoute