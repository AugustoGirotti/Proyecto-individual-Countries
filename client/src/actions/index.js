import axios from "axios";

export function getCountries(){
    return async function(dispatch){
        const countries = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data
        })
    }
}

export function orderByAlph(payload){
    return {
        type: 'ORDER_ALPH',
        payload
    }
}

export function orderByPop(payload){
    return {
        type: 'ORDER_POP',
        payload
    }
}

export function filterByContinent(payload){
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function getCountryByName(name){
    return async function(dispatch){
        try {
            var country = await axios.get('http://localhost:3001/countries?name=' + name)
            return dispatch({
                type: 'GET_COUNTRY_BY_NAME',
                payload: country.data
            })
        } catch(e){
            console.log(e)
        }
    }
}


export function filterByActivity(activity){
    console.log(activity)
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload: activity
    }
}

export function countryDetail(id){
    return async function(dispatch){
        try {
            var json = await axios(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: 'COUNTRY_DETAIL',
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}