import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
const Auth = ({ authRoute }) => {
    let body = (
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