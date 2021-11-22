import './App.css';
import axios from 'axios';
import {React, useEffect, useState } from 'react';
import { Route, Routes, Switch } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import Pagination from './components/Pagination/Pagination';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import CreateActivity from './components/CreateActivity/CreateActivity';


export function App() {
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
    // <div className="App">
      <Switch>
        <Route exact path='/' render={() => <LandingPage/>} />
        <Route path='/home' component={Home}/>
        <Route path='/countries/:id' component={CountryDetail} />
        <Route path='/activity' component={CreateActivity} />
        {/* <Route path='/navbar' component={NavBar} /> */}
      </Switch>
    // </div>

  );
}

export default App;
