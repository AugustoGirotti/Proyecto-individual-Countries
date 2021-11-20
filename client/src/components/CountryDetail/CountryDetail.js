import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { countryDetail } from "../../actions";
import { NavBar } from "../NavBar/NavBar";


export default function CountryDetail(){
    const dispatch = useDispatch() 
    // const countries = useSelector(state => state.allCountries)
    // const country = countries.filter(c => c.id === id)[0]
    // console.log(country)
    const {id} = useParams()

    useEffect(() => {
        dispatch(countryDetail(id))
    }, [])
    // dispatch(countryDetail(id))
    const country = useSelector((state) => state.detail)
    console.log(country)

    // const {image, name, continent, capital, subregion, area, population, activities } = country
    return(
        <div>
            <NavBar/>
            <img src={country.image} className='img'/>
            <h1>{country.name}</h1>
            <p>{country.continent}</p>
            <p>{country.id}</p>
            <p>{country.capital}</p>
            <p>{country.subregion}</p>
            <p>{country.area + 'km2'}</p>
            <p>{country.population}</p>
            <div>
                <h1>Activities:</h1>
                {
                    country.activities === undefined || country.activities.length === 0 ?
                    <h4>No activity</h4> :
                    country.activities.map(a => {
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