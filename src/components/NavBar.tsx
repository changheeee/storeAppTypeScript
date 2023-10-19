import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className='navBar'>
            <h1><Link to="/">집꾸미기</Link></h1>
            <Link to="/cart">Cart</Link>
        </div>
    )
}

export default NavBar