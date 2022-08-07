import { Outlet } from "react-router-dom";
import Header from "./Header";
import { isAuthorized } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Layout = () => {
    const isAuth = useSelector(isAuthorized)

    return (
        <>
            {isAuth && <Header />}
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout