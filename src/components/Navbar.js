import { React, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from '../context/auth/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { LoggedIn, Logout } = useContext(AuthContext)
    useEffect(() => {
        // console.log(location);
    }, [location])
    const handleLogout = () => {
        Logout();
        navigate('/login');
    }
    return (
        <>
            {/* sticky-top */}
            <nav className="navbar navbar-light bg-secondary  navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : " "}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : " "}`} to="/About">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-info mx-2" type="submit">Search</button>
                            {LoggedIn && <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                        </form>
                    </div>
                </div>
            </nav>
        </ >
    )
}

export default Navbar
