import { getCountries } from "../actions";
import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { Country } from "./Country";
export default function Home(){
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    useEffect(()=>{
        dispatch(getCountries())
    }, [])

    return (
        <>
        <Link to='/activity'>
            <button>Create activity</button>
        </Link>
            <h1>Countries</h1>
            {
                countries && countries.map((c) => {
                    return(
                    <Country 
                    key={c.id}
                    name={c.name}
                    id={c.id}
                    image={c.image}
                    continent={c.continent}
                    capital={c.capital}
                    subregion={c.subregion}
                    area={c.area}
                    population={c.population}
                    />
                    )
                })
            }
        </>
    )

}