import axios from "axios";
import React, { useEffect, useState } from "react";
import { Country } from "../Country/Country";
import style from './Pagination.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";

const renderData = data => {
    return(
        <ul className={style.countries}>
            {data === undefined || data.length === 0 ? <p>Country not found</p> :
                data.map((country, index)=>{
                    // return <li key={index} >{country.name}</li>
                    return <Country 
                    key={index}
                    name={country.name}
                    id={country.id}
                    image={country.image}
                    continent={country.continent}
                    capital={country.capital}
                    subregion={country.subregion}
                    area={country.area}
                    population={country.population}
                    />
                })  
            }
        </ul>
    )
}

export default function Pagination({countries}){
    // const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    //defino la cantidad de paginas que voy a necesitar dividiendo el largo del arreglo de paises
    //por la cantidad de paises por pagina
    const data = countries
    const dispatch = useDispatch()


    useEffect(() => {
        if (currentPage === 1){
            setitemsPerPage(9)
        } else {
            setitemsPerPage(10)
        }
    },[currentPage])

    
    useEffect(() => {
        setCurrentPage(1)
        setMaxPageNumberLimit(5)
        setMinPageNumberLimit(0)
    }, [countries])
    
    const handleClick = (event)=>{
        setCurrentPage(Number(event.target.id))
    }

    const pages = [];
    for (let i = 0; i < Math.ceil(data.length/itemsPerPage); i++){
        pages.push(i + 1);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


    const renderPageNumbers = pages.map((number)=>{
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return(
                <li 
                key={number} 
                id={number} 
                onClick={handleClick} 
                className={currentPage == number ? style.active : null}
                >
                    {number}
                </li>
            )
        } else return null;
    })

    // useEffect(()=>{
    //     axios.get('http://localhost:3001/countries')
    //     .then(r => setData(r.data))
    // },[])
    // console.log(data)


    const handleNextButton = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlePrevButton = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }


    return(
        <div className={style.container}>
            
            <ul className={style.pageNumbers}>
                <li>
                    <button 
                    onClick={handlePrevButton}
                    disabled={currentPage === pages[0] ? true : false}
                    >
                        Prev
                    </button>
                </li>
                    {renderPageNumbers}
                <li>
                    <button 
                    onClick={handleNextButton}
                    disabled={currentPage === (pages.length) ? true : false}
                    >
                        Next
                    </button>
                </li>
            </ul>
            {renderData(currentItems)}
        </div>
    )
}