import { Country } from "./Country"
import './Countries.css'

export function Countries({countries, loading}){
    if (loading){
        return <h2>Loading...</h2>
    }
    return(
            <div className='countries'>
            {countries.map(c => {
                return (
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
                    
                })}
            </div>    
    )
}