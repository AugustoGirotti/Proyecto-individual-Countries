import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css'
export default function LandingPage(){

    return(
        <div className={style.container}>
            <div className={style.content}>
                <h1 className={style.title}>Welcome</h1>
                <Link to='/home'>
                    <button className={style.btn}>home</button>
                </Link>
            </div>
        </div>
    )
}
