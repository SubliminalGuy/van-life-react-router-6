import { Link, NavLink } from 'react-router-dom'
import avatar from '../assets/images/avatar-icon.png'

function fakeLogin() {
    localStorage.removeItem('loggedin')
}

export default function Navbar() {
    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616',
    }

    return (
        <header>
            <Link className="site-logo" to="/">
                #VanLife
            </Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Vans
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    About
                </NavLink>
                <Link to="login" className="login-link">
                    <img src={avatar} className="login-icon" alt="Login Icon" />
                </Link>
                <button onClick={fakeLogin}>X</button>
            </nav>
        </header>
    )
}
