import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { countryDetail } from "../../actions";
import { NavBar } from "../NavBar/NavBar";
import style from './CountryDetail.module.css'

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
        <>
        <NavBar/>
        <div className={style.container}>
            <div className={style.country}>
                <img src={country.image} className={style.img}/>
                <div className={style.info}>
                    <h2>Name: {country.name}</h2>
                    <p>Continent: {country.continent}</p>
                    <p>Id: {country.id}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Subregion: {country.subregion}</p>
                    <p>Area: {country.area + 'km2'}</p>
                    <p>Population: {country.population}</p>
                </div>
            </div>
            <h2 className={style.title}>Activities:</h2>
            <div className={style.activities}>
                {
                    country.activities === undefined || country.activities.length === 0 ?
                    <h4>No activity</h4> :
                    country.activities.map(a => {
                        return (
                            <div key={a.id}>
                                <h3>{a.name}</h3>
                                <p>{'Difficulty: ' + a.difficulty}</p>
                                <p>{'Duration: ' + a.duration + ' hours'}</p>
                                <p>{'Season: ' + a.season}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}