import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'
export default function LandingPage(){

    return(
        <div>
            <h1>Welcome</h1>
            <Link to='/home'>
                <button>home</button>
            </Link>
        </div>
    )
}
