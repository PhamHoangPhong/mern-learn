import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
const Auth = ({ authRoute }) => {

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    let body
    if (authLoading) {
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (isAuthenticated) return <Navigate replace to='/dasboard' />
    else body = (
        <>
        {
            authRoute === 'login' && <Login />
        }
        {
            authRoute === 'register' && <Register />
        }
        </>
    )
    return (
        <div className='body'>
            <div className='landingInner'>
                <div className = 'header-form'>
                    <h1 className='title'>Learn It</h1>
                    <h3 className='title-2'>Keep track of what you are learning</h3>
                </div>
                <div className='body-form'>   
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth