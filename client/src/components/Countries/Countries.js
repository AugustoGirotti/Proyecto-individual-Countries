import { Country } from "../Country/Country";
// import './Countries.css'
import styled from "styled-components";

const Container = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
`;

export function Countries({ countries, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container>
      {countries.map((c) => {
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
        );
      })}
    </Container>
  );
}
