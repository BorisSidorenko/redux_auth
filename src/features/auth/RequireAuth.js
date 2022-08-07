import { useLocation, Navigate, Outlet } from "react-router-dom";
import cookie from 'js-cookie'

const RequireAuth = () => {
    const token = cookie.get('jwt')
    const location = useLocation()

    return (
        token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth