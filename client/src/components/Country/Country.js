import React from "react";
import style from './Country.module.css'
import { Link } from "react-router-dom";
export function Country({name, id, image, continent, capital, subregion, area, population}) {
    return(
        <div className={style.card}>
            <img src={image} className={style.img}/>
            <h3 className={style.name}>{name}</h3>
            <p>{continent}</p>
            <Link to={`/countries/${id}`} className={style.link}>
                <p className={style.getInfo}>Get info</p>
            </Link>
        </div>
    )
}