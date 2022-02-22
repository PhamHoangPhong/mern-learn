import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState, useContext} from 'react';
import AlertMessage from '../layouts/AlertMessage';
import { AuthContext } from '../../contexts/AuthContext';
const Register = () => {
    //state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(null)
    const {username, password, confirmPassword} = registerForm
    //context
    const {registerUser} = useContext(AuthContext)
    //router
    const navigate = useNavigate()
    //function
    const onRegister = event => {
        setRegisterForm({...registerForm, [event.target.name]: event.target.value})
    }

    const register = async event => {
        event.preventDefault()
        const dataRegister = {username, password}
        const dataResponse = await registerUser(dataRegister)
        if (password !== confirmPassword) {
            setAlert({type: 'danger', message: 'Incorect confirm password'})
        }
        try {
            if (!dataResponse.success) {
                setAlert({type: 'danger', message: dataResponse.message})
            } else {
                setAlert({type: 'success', message: dataResponse.message})
                setTimeout(() => navigate('/login'), 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='text-p'>
                        We'll never share your email with anyone else.
                    </p>
                    <Form.Control type="text" placeholder="Enter username" name='username' onChange={onRegister} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name='password' onChange={onRegister} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Confirm password" name='confirmPassword' onChange={onRegister} />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Register
                </Button>
            </Form>
            <hr />
            <p className='text-p'>
                Already have account? <Link to='/login'><Button variant='success'>Login</Button></Link>
            </p>
        </>
    )
}

export default Register