import './App.css';
import axios from 'axios';
import {React, useEffect, useState } from 'react';
import { Country } from './components/Country';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { Countries } from './components/Countries';
import Pagination from './components/Pagination';

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const petitionGet = async () => {
      setLoading(true)
      var response = await axios.get('http://localhost:3001/countries')
      setCountries(response.data)
      setLoading(false)
    }
    petitionGet()
  }, [])

  
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Pagination/>}/>
        <Route path='/countries' element={<Countries countries={countries} loading={loading} />} />
      </Routes>
    </div>

  );
}

export default App;
