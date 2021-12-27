import {
  filterByActivity,
  filterByContinent,
  getCountries,
  orderByAlph,
  orderByPop,
  getActivities,
} from "../../actions";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { NavBar } from "../NavBar/NavBar";
import style from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const allCountries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);

  // console.log(activities)

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  const [order, setOrder] = useState("");

  function handleOrderAlph(e) {
    dispatch(orderByAlph(e.target.value));
    setOrder(e.target.value);
  }

  function handleOrderPop(e) {
    dispatch(orderByPop(e.target.value));
    setOrder(e.target.value);
  }

  function handleFilterByContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }

  function handleGetAllCountries() {
    dispatch(getCountries());
  }

  function handleFilterByActivity(e) {
    dispatch(filterByActivity(e.target.value));
  }

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.buttons}>
          <Link to="/activity">
            <button className={style.btn}>Create activity</button>
          </Link>
          <button onClick={handleGetAllCountries} className={style.btn}>
            Get all countries
          </button>
          <select
            name="alphabetical"
            onChange={(e) => handleOrderAlph(e)}
            className={style.filter}
          >
            <option>-Alphabetical order-</option>
            <option value="upwardAlph">Upward</option>
            <option value="fallingAlph">Falling</option>
          </select>
          <select
            name="population"
            onChange={(e) => handleOrderPop(e)}
            className={style.filter}
          >
            <option>-Population order-</option>
            <option value="upwardPop">Upward</option>
            <option value="fallingPop">Falling</option>
          </select>
          <select
            name="continent"
            onChange={(e) => handleFilterByContinent(e)}
            className={style.filter}
          >
            <option value="empty">-FilterByContinent-</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
            <option value="americas">America</option>
            <option value="antarctic">Antarctic</option>
          </select>
          <select onChange={handleFilterByActivity} className={style.filter}>
            <option value="empty">-FilterByActivity-</option>
            {activities.map((a, i) => (
              <option value={a.name} key={i}>
                {a.name}
              </option>
            ))}
          </select>
          <SearchBar />
        </div>
        <Pagination countries={countries} />
      </div>
    </>
  );
}
