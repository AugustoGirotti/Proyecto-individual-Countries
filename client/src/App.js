import './App.css';
import axios from 'axios';
import {React, useEffect, useState } from 'react';
import { Country } from './components/Country';
import { NavBar } from './components/NavBar';
import { Route, Routes, Switch } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { Countries } from './components/Countries';
import Pagination from './components/Pagination';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';

function App() {
  // const [countries, setCountries] = useState([])
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const petitionGet = async () => {
  //     setLoading(true)
  //     var response = await axios.get('http://localhost:3001/countries')
  //     setCountries(response.data)
  //     setLoading(false)
  //   }
  //   petitionGet()
  // }, [])

  
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <LandingPage/>} />
        {/* <Route path='/home' component={Home}/> */}
        {/* <Route path='/' render={() => <NavBar/>}/> */}
        <Route path='/home' component={Home}/>
        {/* <Route path='/countries' render={() => <Countries countries={countries} loading={loading} />} /> */}
        <Route path='/countries/:id' component={CountryDetail} />
        <Route path='/activity' component={CreateActivity} />
        <Route path='/navbar' component={NavBar} />
      </Switch>
    </div>

  );
}

export default App;
