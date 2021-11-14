import { useState } from "react"
import axios from "axios"

export function SearchBar({onSearch}){
    const [country, setCountry] = useState([])
    
    async function onSearch(country){
        await axios.get(`http://localhost:3001/countries?name=${country}`)
        .then(response => setCountry(response.data))
    }
    return (
        <input value={country} placeholder={'Search country...'} 
        onClick={(e)=>onSearch(e.target.value)}></input>
    )
}