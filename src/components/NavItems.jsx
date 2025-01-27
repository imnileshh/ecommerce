import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItems({ to, label, onClick }) {
    return (
        <li className='list-none'>
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) => `block text-lg font-bold  px-2 ${isActive ? 'text-black  ' : 'text-gray-400'}`} >
                {label}
            </NavLink>
        </li>
    )
}

export default NavItems