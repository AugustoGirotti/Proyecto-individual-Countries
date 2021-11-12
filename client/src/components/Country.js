import React from "react";
import './Country.css'
export function Country({name, id, image, continent, capital, subregion, area, population}) {
    return(
        <div className='country'>
            <h1>{name}</h1>
            <p>{id}</p>
            <p>{continent}</p>
            <p>{capital}</p>
            <p>{subregion}</p>
            <p>{area}</p>
            <p>{population}</p>
            <img src={image} className='img'/>
        </div>
    )
}