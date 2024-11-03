import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav>
                <h1>Navbarr...</h1>
            </nav>

            <Outlet />
        </div>
    )
}

export default Navbar