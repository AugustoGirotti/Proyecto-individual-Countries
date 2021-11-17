import React from "react";
import './Country.css'
import { Link } from "react-router-dom";
export function Country({name, id, image, continent, capital, subregion, area, population}) {
    return(
        <div className='country'>
            <img src={image} className='img'/>
            <Link to={`/countries/${id}`}>
            <h1>{name}</h1>
            </Link>
            <p>{continent}</p>
            {/* <p>{id}</p>
            <p>{capital}</p>
            <p>{subregion}</p>
            <p>{area}</p>
            <p>{population}</p> */}
        </div>
    )
}