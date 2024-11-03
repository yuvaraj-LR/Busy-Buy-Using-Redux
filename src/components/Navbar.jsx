import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

function Navbar() {
    const isUserLoggedIn = false;

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-bg">
                    <div className="container-fluid wrapper make_center">
                        <div className="navbar-brand">
                            <NavLink to="/" className="brand-title">
                                <img src="./logo.png" alt="logo" className="home_logo" />
                            </NavLink>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-2">
                                    <NavLink className={ ({isActive}) => isActive ? "current-nav" : null } to="/">Home</NavLink>
                                </li>
                                <li className={`nav-item mx-2 ${!isUserLoggedIn ? "hidden" : ""}`}>
                                    <NavLink className={ ({isActive}) => isActive ? "current-nav" : null } to="/order">Order</NavLink>
                                </li>
                                <li className={`nav-item mx-2 ${!isUserLoggedIn ? "hidden" : ""}`}>
                                    <NavLink className={ ({isActive}) => isActive ? "current-nav" : null } to="/cart">Cart</NavLink>
                                </li>
                            </ul>
                            <form className="d-flex mx-2" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search for products" aria-label="Search" />
                            </form>

                            {!isUserLoggedIn ? <Link className="btn btn-primary" to="/signin">Login</Link> : <div className="flex flex_row flex_center gap-1 btn btn-outline-primary"><span><i className="fa-solid fa-arrow-right-from-bracket"></i></span><div>Logout</div></div>}
                        </div>
                    </div>
                </nav>
            </header>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar