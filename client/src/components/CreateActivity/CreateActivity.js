import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar";
import style from "./CreateActivity.module.css";
import styled from "styled-components";

// const StyledForm = styled.form`
//   background-size: cover;
//   height: 100vh;
//   background-color: aliceblue;
// `;
const Content = styled.div`
  height: 70px;
  margin-left: 10px;
  margin-top: 10px;
  & input {
    margin-left: 5px;
    height: 20px;
    border-radius: 5px;
  }
`;
const Select = styled.div`
  margin-left: 10px;
  & select {
    background-color: #060b26;
    color: aliceblue;
    cursor: pointer;
    height: 25px;
    border-radius: 10px;
    border: none;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  background-color: aliceblue;
  height: auto;
  min-height: 83vh;
  padding-bottom: 50px;
`;
const StyledForm = styled.form`
  padding: 20px;
  background-size: cover;
  background-color: #cddfee;
  border: black solid 2px;
  border-radius: 10px;
  width: 500px;
  height: auto;
  margin-top: 20px;
  width: auto;
`;

export default function CreateActivity() {
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  const allCountries = useSelector((state) => state.allCountries);

  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    let difficulties = [1, 2, 3, 4, 5];
    let seasons = ["summer", "autumn", "winter", "spring"];

    if (!input.name) {
      errors.name = "Name is required";
    } else if (input.name.length > 15) {
      errors.name = "Name is too long!";
    } else if (parseInt(input.name)) {
      errors.name = "Name cannot be a number";
    }
    if (!input.difficulty) {
      errors.difficulty = "Difficulty is required";
    } else if (
      !parseInt(input.difficulty) &&
      parseInt(input.difficulty) !== 0
    ) {
      errors.difficulty = "Difficulty must be a number";
    } else if (!difficulties.includes(parseInt(input.difficulty))) {
      errors.difficulty = "Difficulty must be between 1 and 5";
    }
    if (!input.duration) {
      errors.duration = "Duration is required";
    } else if (!parseInt(input.duration)) {
      errors.duration = "Duration must be a number";
    } else if (input.duration.length > 3) {
      errors.duration = "Duration cannot be that long!";
    }
    if (!input.season) {
      errors.season = "Season is required";
    } else if (!seasons.includes(input.season.toLowerCase())) {
      errors.season = "Not a valid season";
    }
    if (input.country.length === 0) {
      errors.country = "Country is required";
    }
    return errors;
  }

  function handleInputChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    let errors = validate({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(errors);
  }

  function handleSelect(e) {
    if (!input.country.includes(e.target.value) && e.target.value !== "empty") {
      setInput({
        ...input,
        country: [...input.country, e.target.value],
      });
    }
    let errors = validate({
      ...input,
      country: [...input.country, e.target.value],
    });
    setErrors(errors);
  }

  function deleteCountry(e) {
    e.preventDefault();
    const newCountries = input.country.filter((c) => c !== e.target.value);
    setInput({
      ...input,
      country: newCountries,
    });
    let errors = validate({ ...input, country: newCountries });
    setErrors(errors);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // for (let i = 0; i< input.country.length; i++){
    //     var response = await axios.post('http://localhost:3001/activity', {...input, country: input.country[i]})
    //     alert(response.data)
    // }
    var response = await axios.post("http://localhost:3001/activity", input);
    alert(response.data);
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
  }

  return (
    <>
      <NavBar />
      <Container>
        <StyledForm>
          <Content>
            <label className={style.text}>Name:</label>
            <input
              name="name"
              value={input.name}
              onChange={handleInputChange}
              className={errors.name && style.danger}
            />
            {errors.name && <p className={style.danger}>{errors.name}</p>}
          </Content>
          <Content>
            <label className={style.text}>Difficulty:</label>
            <input
              name="difficulty"
              value={input.difficulty}
              onChange={handleInputChange}
              className={errors.difficulty && style.danger}
            />
            {errors.difficulty && (
              <p className={style.danger}>{errors.difficulty}</p>
            )}
          </Content>
          <Content>
            <label className={style.text}>{"Duration (in hours):"}</label>
            <input
              name="duration"
              value={input.duration}
              onChange={handleInputChange}
              className={errors.duration && style.danger}
            />
            {errors.duration && (
              <p className={style.danger}>{errors.duration}</p>
            )}
          </Content>
          <Content>
            <label className={style.text}>Season:</label>
            <input
              name="season"
              value={input.season}
              onChange={handleInputChange}
              className={errors.season && "danger"}
            />
            {errors.season && <p className={style.danger}>{errors.season}</p>}
          </Content>
          <Select>
            <p className={style.text}>Select countries:</p>
            <select onChange={handleSelect}>
              <option value="empty">-Select-</option>
              {allCountries.map((c) => (
                <option value={c.name} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.country && <p className={style.danger}>{errors.country}</p>}
            {input.country.map((c, i) => {
              return (
                <div key={i} className={style.countryOption}>
                  <p key={c}>{c}</p>
                  <button
                    value={c}
                    onClick={deleteCountry}
                    className={style.deleteBtn}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </Select>
          <button
            className={style.button}
            onClick={(e) => handleSubmit(e)}
            disabled={
              errors.name ||
              errors.difficulty ||
              errors.duration ||
              errors.season ||
              errors.country ||
              !input.name
                ? true
                : false
            }
          >
            Submit
          </button>
        </StyledForm>
      </Container>
    </>
  );
}
