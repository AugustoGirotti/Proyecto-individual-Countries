import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountryByName(name))
        setName('')
    }
    return (
        <div>
            <input
            type='text'
            placeholder='Search country...'
            onChange={handleInputChange}
            value={name}
            />
            <button disabled={name ? false : true} onClick={handleSubmit} type='submit'>Search</button>
        </div>
    )
}