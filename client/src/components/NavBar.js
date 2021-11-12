import React from "react";
import Logo from '../img/planeta.png'
import { Link } from "react-router-dom";
import './NavBar.css'

export function NavBar(){
    return (
        <nav className='nav'>
            <Link to='/countries' className='link'>
                <span className='span'>
                    Countries
                </span>
            </Link>
        </nav>
    )
}