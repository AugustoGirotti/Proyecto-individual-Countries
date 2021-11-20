import React, { useState } from "react";
import './CreateActivity.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavBar } from "../NavBar/NavBar";


export default function CreateActivity(){
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country:[]
    })



    const allCountries = useSelector(state => state.allCountries)

    const [errors, setErrors] = useState({})

    function validate(input){
        let errors = {}
        let difficulties = [1, 2, 3, 4, 5]
        let seasons = ['summer', 'autumn', 'winter', 'spring']

        if (!input.name){
            errors.name = 'Name is required'
        } else if (input.name.length > 15) {
            errors.name = 'Name is too long!'
        } else if (parseInt(input.name)){
            errors.name = 'Name cannot be a number'
        }
        if (!input.difficulty){
            errors.difficulty = 'Difficulty is required'
        } else if (!parseInt(input.difficulty) && parseInt(input.difficulty) !== 0){
            errors.difficulty = 'Difficulty must be a number'
        } else if (!difficulties.includes(parseInt(input.difficulty))) {
            errors.difficulty = 'Difficulty must be between 1 and 5'
        } 
        if (!input.duration){
            errors.duration = 'Duration is required'
        } else if (!parseInt(input.duration)){
            errors.duration = 'Duration must be a number'
        } else if (input.duration.length > 3) {
            errors.duration = 'Duration cannot be that long!'
        }
        if (!input.season){
            errors.season = 'Season is required'
        } else if(!seasons.includes(input.season.toLowerCase())) {
            errors.season = 'Not a valid season'
        }
        if(!input.country){
            errors.country = 'Country is required'
        }
        return errors
    }


    function handleInputChange(event){
        setInput({
            ...input,
            [event.target.name]:event.target.value
        })
        let errors = validate({...input, [event.target.name]: event.target.value})
        setErrors(errors)
    }

    function handleSelect(e){
        if (!input.country.includes(e.target.value)){
            setInput({
                ...input,
                country: [...input.country, e.target.value]
            })
        }
    }

    function deleteCountry(e){
        e.preventDefault()
        const newCountries = input.country.filter(c => c !== e.target.value)
        setInput({
            ...input,
            country: newCountries
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        for (let i = 0; i< input.country.length; i++){
            var response = await axios.post('http://localhost:3001/activity', {...input, country: input.country[i]})
            alert(response.data)
        }
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            country:[]
        })
    }
    return (
        <>
        <NavBar />
        <form>
            <div>
                <Link to='/home'>
                    <button>Volver</button>
                </Link>
            </div>
            <div>
                <label>Name:</label>
                <input name='name'
                value={input.name}
                onChange={handleInputChange}
                className={errors.name && 'danger'}
                />
                {
                    errors.name && (<p className='danger'>{errors.name}</p>)
                }
            </div>
            <div>
                <label>Difficulty:</label>
                <input name='difficulty'
                value={input.difficulty}
                onChange={handleInputChange}
                className={errors.difficulty && 'danger'}
                />
                {
                    errors.difficulty && (<p className='danger'>{errors.difficulty}</p>)
                }
            </div>
            <div>
                <label>{'Duration (in hours):'}</label>
                <input name='duration'
                value={input.duration}
                onChange={handleInputChange}
                className={errors.duration && 'danger'}
                />
                {
                    errors.duration && (<p className='danger'>{errors.duration}</p>)
                }
            </div>
            <div>
                <label>Season:</label>
                <input name='season'
                value={input.season}
                onChange={handleInputChange}
                className={errors.season && 'danger'}
                />
                {
                    errors.season && (<p className='danger'>{errors.season}</p>)
                }
            </div>
            <p>Select countries:</p>
            <select onChange={handleSelect}>
                {
                    allCountries.map(c => (
                        <option value={c.name} key={c.id}>{c.name}</option>
                    ))
                }
            </select>
                {
                    input.country.map((c,i) => {
                        return (
                            <div key={i}>
                                <button value={c} onClick={deleteCountry}>X</button>
                                <p key={c}>{c}</p>
                            </div>
                        )
                    })
                }
            <button 
            onClick={(e) => handleSubmit(e)} 
            disabled={(errors.name || errors.difficulty || errors.duration || errors.season || errors.country || !input.name) ? true : false}>Submit</button>
        </form>
        </>
    )
}