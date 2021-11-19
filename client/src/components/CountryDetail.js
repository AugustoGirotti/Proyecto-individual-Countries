import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function CountryDetail({match}){
    const {id} = match.params
    const countries = useSelector(state => state.allCountries)
    const country = countries.filter(c => c.id === id)[0]
    console.log(country)

    const {image, name, continent, capital, subregion, area, population, activities } = country
    return(
        <div>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <img src={image} className='img'/>
            <h1>{name}</h1>
            <p>{continent}</p>
            <p>{id}</p>
            <p>{capital}</p>
            <p>{subregion}</p>
            <p>{area + 'km2'}</p>
            <p>{population}</p>
            <div>
                <h1>Activities:</h1>
                {
                    activities.map(a => {
                        return (
                            <div key={a.id}>
                                <h2>{a.name}</h2>
                                <p>{'Difficulty: ' + a.difficulty}</p>
                                <p>{'Duration: ' + a.duration}</p>
                                <p>{'Season: ' + a.season}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}