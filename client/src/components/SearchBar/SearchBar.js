import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../actions";
import style from './SearchBar.module.css'

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
        <div className={style.searchBox}>
            <input
            type='text'
            placeholder='Search country...'
            onChange={handleInputChange}
            value={name}
            className={style.searchText}
            />
            <button disabled={name ? false : true} onClick={handleSubmit} type='submit' className={style.btn}>Search</button>
        </div>
    )
}