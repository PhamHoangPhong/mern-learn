import Button from 'react-bootstrap/Button';
import {useState, useContext} from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

const Login = () => {
    //state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState(null)
    const {username, password} = loginForm
    //context
    const {loginUser} = useContext(AuthContext)
    //function
    const onLoginForm = event => {
        setLoginForm({...loginForm, [event.target.name]: event.target.value})
    }
    const login = async event => {
        event.preventDefault()
        try {
            const dataResponse = await loginUser(loginForm)
            if (!dataResponse.success) {
                setAlert({type: 'danger', message: dataResponse.message})
                setTimeout(() => setAlert(null), 1500)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='text-p'>
                        We'll never share your email with anyone else.
                    </p>
                    <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={onLoginForm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onLoginForm} />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Login
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