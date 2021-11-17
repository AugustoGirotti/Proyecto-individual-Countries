

const initialState = {
    countries: [],
    allCountries:[]
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'ORDER_ALPH':
            const countries = state.countries
            if (action.payload === 'upwardAlph'){
                countries.sort((a,b) => {
                    if (a.name > b.name) return 1
                    else if (b.name > a.name) return -1
                    else return 0
                })
                return {
                    ...state,
                    countries
                }
            }
            else if (action.payload === 'fallingAlph'){
                countries.sort((a,b) => {
                    if (a.name > b.name) return 1
                    else if (b.name > a.name) return -1
                    else return 0
                }).reverse()
                return {
                    ...state,
                    countries
                }
            }
            else return {
                ...state
            }
        case 'ORDER_POP':
            const countriesPop = state.countries
            if (action.payload === 'upwardPop'){
                countriesPop.sort((a, b) => a.population - b.population)
                return {
                    ...state,
                    countries: countriesPop
                }
            }
            else if (action.payload === 'fallingPop'){
                countriesPop.sort((a, b) => b.population - a.population)
                return {
                    ...state,
                    countries: countriesPop
                }
            }
            else return {
                ...state
            }
        case 'FILTER_BY_CONTINENT':
            if (action.payload === 'empty') return {...state}
            else{
                const countriesByContinent = state.allCountries.filter((c) => c.continent.toLowerCase() === action.payload)
                return {
                    ...state,
                    countries: countriesByContinent
                }
            }
        case 'GET_COUNTRY_BY_NAME':
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
}