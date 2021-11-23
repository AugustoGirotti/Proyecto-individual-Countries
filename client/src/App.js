import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import CreateActivity from './components/CreateActivity/CreateActivity';


export function App() {
  
  return (
      <Switch>
        <Route exact path='/' render={() => <LandingPage/>} />
        <Route path='/home' component={Home}/>
        <Route path='/countries/:id' component={CountryDetail} />
        <Route path='/activity' component={CreateActivity} />
      </Switch>

  );
}

export default App;
