import { Link } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { setUserProfile } from "../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../features/profile/profileApiSlice";
import { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error 
    } = useGetProfileQuery()
    
    useEffect(() => {        
        if (isSuccess) {
            const [profile] = data.data
            dispatch(setUserProfile(profile.attributes))
        }
    }, [data, dispatch, isSuccess])

    const handleLogoutClick = () => {
        dispatch(logOut())
        navigate('/login')
    }

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        const [profile] = data.data
        content = (
            <header className="header">                
                <Navbar bg="dark" variant="dark">
                    <Container>                       
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>                    
                        </Nav>
                        <Nav>
                            <Navbar.Text className="me-2">
                                {profile.attributes.name}
                            </Navbar.Text>
                            <Button
                                type="button"
                                onClick={handleLogoutClick}
                                variant="outline-warning"
                            >
                                Logout
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }

    

    return content
}

export default Header