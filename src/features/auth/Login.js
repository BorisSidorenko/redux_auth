import { useRef, useState, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setCredentials, isAuthorized } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import { Form, Button } from "react-bootstrap"

const Login = () => {
    const isAuth = useSelector(isAuthorized)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuth) navigate(from, { replace: true })        
    }, [isAuth, from, navigate])

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        console.log('submit clicked')
        e.preventDefault()

        try {
            const userData = await login({ identifier: user, password: pwd }).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing username or password')
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}></p>

                    <h1>Login</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                autoComplete="off"
                                ref={userRef}
                                value={user}
                                onChange={handleUserInput}
                                required                        
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={pwd}
                                onChange={handlePwdInput}
                                autoComplete="off"
                                required
                            />
                        </Form.Group>


                        <div className="text-center">
                            <Button 
                                variant="primary"
                                type="submit"                                 
                            >
                            Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )

    return content
}

export default Login