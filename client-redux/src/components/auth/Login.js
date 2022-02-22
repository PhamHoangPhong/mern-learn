import Button from 'react-bootstrap/Button';
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { authSelector, loginUser } from '../../store/reducers/authSlice';

const Login = () => {
    const authState = useSelector(authSelector)
    const dispatch = useDispatch()
    const [loginForm, setLoginForm] = useState({
        username:'',
        password: ''
    })

    const onLoginForm = event => {
        setLoginForm({...loginForm, [event.target.name]: event.target.value})
    }

    const login = event => {
        event.preventDefault()
        dispatch(loginUser(loginForm))
        
        console.log(authState)
        
    }
    return (
        <>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='text-p'>
                        We'll never share your email with anyone else.
                    </p>
                    <Form.Control type="text" placeholder="Enter username" name="username" onChange={onLoginForm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onLoginForm} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <hr />
            <p className='text-p'>
                Don't have account? <Link to='/register'><Button variant='success'>Register</Button></Link>
            </p>
        </>
        
    )
}

export default Login