import { filterByActivity, filterByContinent, getCountries, orderByAlph, orderByPop } from "../actions";
import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { Country } from "./Country";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { NavBar } from "./NavBar";


export default function Home(){
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const allCountries = useSelector(state => state.allCountries)
    // const activities = useSelector(state => state.activities)

    useEffect(()=>{
        dispatch(getCountries())
    }, [])


    const [order, setOrder] = useState('')

    function handleOrderAlph(e){
        dispatch(orderByAlph(e.target.value))
        setOrder(e.target.value)
    }

    function handleOrderPop(e){
        dispatch(orderByPop(e.target.value))
        setOrder(e.target.value)
    }

    function handleFilterByContinent(e){
        dispatch(filterByContinent(e.target.value))
    }

    function handleGetAllCountries(){
        dispatch(getCountries())
    }

    function handleFilterByActivity(e){
        dispatch(filterByActivity(e.target.value))
    }

    return (
        <>
        <NavBar />
        <Link to='/activity'>
            <button>Create activity</button>
        </Link>
        <button onClick={handleGetAllCountries}>Get all countries</button>
        <select name='alphabetical' onChange={(e) =>handleOrderAlph(e)}>
            <option>-Alphabetical order-</option>
            <option value='upwardAlph'>Upward</option>
            <option value='fallingAlph'>Falling</option>
        </select>
        <select name='population' onChange={(e) => handleOrderPop(e)}>
            <option>-Population order-</option>
            <option value='upwardPop'>Upward</option>
            <option value='fallingPop'>Falling</option>
        </select>
        <select name='continent' onChange={(e) => handleFilterByContinent(e)}>
            <option value='empty'>-FilterByContinent-</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='africa'>Africa</option>
            <option value='oceania'>Oceania</option>
            <option value='americas'>America</option>
            <option value='antarctic'>Antarctic</option>
        </select>
        <select onChange={handleFilterByActivity}>
            <option value='empty'>-FilterByActivity-</option>
            {
                allCountries.map(c => (
                    c.activities.map(a => (
                        <option value={a.name}>{a.name}</option>
                    ))
                ))
            }
        </select>
        <SearchBar />
        <h1>Countries</h1>
        <Pagination countries={countries}/>
        </>
    )

}