import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function CountryDetail({match}){
    const {id} = match.params
    const countries = useSelector(state => state.countries)
    const country = countries.filter(c => c.id === id)[0]
    console.log(country)
    const {image, name, continent, capital, subregion, area, population, activities } = country
    return(
        <div>
            <img src={image} className='img'/>
            <h1>{name}</h1>
            <p>{continent}</p>
            <p>{id}</p>
            <p>{capital}</p>
            <p>{subregion}</p>
            <p>{area}</p>
            <p>{population}</p>
            <div>
                <h1>Activities:</h1>
                {
                    activities.map(a => {
                        return (
                            <h4 key={a.id}>{a.name}</h4>
                        )
                    })
                }
            </div>
        </div>
    )
}