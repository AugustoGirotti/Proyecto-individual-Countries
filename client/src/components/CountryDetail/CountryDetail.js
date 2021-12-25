import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { countryDetail } from "../../actions";
import { NavBar } from "../NavBar/NavBar";
// import style from './CountryDetail.module.css'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: cover;
    background-position: center;
    height: 100vh; 
    width: 100%;
    background-color: aliceblue;
    padding: 0%;
    margin: 0%;
`
const Country = styled.div`
    height: auto;
    margin:  20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 3px solid purple;
    border-radius: 30px; */
    /* background-color: purple; */
    & img {
        height: 170px;
        width: 300px;
        margin: 10px;
    }
    & div {
        display: flex;
        flex-direction: column;
        align-items:flex-start;
    }
    & h2 {
        margin: 5px;
    }
    & p {
        margin: 5px;
        margin-left: 10px;
        font-weight: 700;
        font-size: 20px;
    }
`
const Title = styled.h2`
    margin-top: 10px;
    border: 3px solid rgb(181, 131, 204);
    border-radius: 10px; 
    background-color: rgb(181, 131, 204);
`
const Activities = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;

    @media screen and (max-width: 768px){
        grid-template-columns: repeat(3, 1fr);
    }
    & p {
        margin: 5px;
        font-weight: bolder;
    }
    & h3 {
        margin: 5px;
    }
`

const Activity = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid rgb(181, 131, 204);
    border-radius: 30px;
    background-color: rgb(181, 131, 204);
    margin: 10px;
`

export default function CountryDetail(){
    const dispatch = useDispatch() 
    const {id} = useParams()
    useEffect(() => {
        dispatch(countryDetail(id))
    }, [])
    const country = useSelector((state) => state.detail)
    console.log(country)

    return(
        <>
        <NavBar/>
        <Container>
            <Country>
                <img src={country.image} />
                <div>
                    <h2>Name: {country.name}</h2>
                    <p>Continent: {country.continent}</p>
                    <p>Id: {country.id}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Subregion: {country.subregion}</p>
                    <p>Area: {country.area + 'km2'}</p>
                    <p>Population: {country.population}</p>
                </div>
            </Country>
            <Title>Activities:</Title>
            <Activities>
                {
                    country.activities === undefined || country.activities.length === 0 ?
                    <h4>No activity</h4> :
                    country.activities.map(a => {
                        return (
                            <Activity key={a.id}>
                                <h3>{a.name}</h3>
                                <p>{'Difficulty: ' + a.difficulty}</p>
                                <p>{'Duration: ' + a.duration + ' hours'}</p>
                                <p>{'Season: ' + a.season}</p>
                            </Activity>
                        )
                    })
                }
            </Activities>
        </Container>
        </>
    )
}