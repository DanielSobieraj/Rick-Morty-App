import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Box, Button} from "@material-ui/core";
import {home} from "../../common/routes";

function reducer(state, action) {
  switch (action.type) {
    case "nextPage":
      return (state = state + 1);
    case "prevPage":
      if (state === 1) {
        return (state = 1);
      } else {
        return (state = state - 1);
      }
    default:
      return state;
  }
}

export function Catalog() {
  const baseURL = "https://rickandmortyapi.com/api/character/?";
  const [character, setCharacter] = useState([]);
  const [state, dispatch] = useReducer(reducer, 1);

  useEffect(() => {
    axios.get(`${baseURL}page=${state}`, {}).then(({data}) => {
      setCharacter(data.results);
    });
  }, [state]);

  const characters = character.map((character) => (
      <div className="character__card" key={character.id}>
        <img
            className="character__image"
            src={character.image}
            alt={character.name}
        />
        <p key={character.id}>
          [{character.id}] {character.name} - <span>{character.status}</span>
        </p>
      </div>
  ));

  return (
      <Box className="background">
        <Box className="container">
          {characters}
          <Box className="footer">
            <Link to={home}>
              <Button>Search character</Button>
            </Link>
            <Box className="buttons">
              <Button onClick={() => dispatch({type: "prevPage"})}>
                Prev Page
              </Button>
              <Button onClick={() => dispatch({type: "nextPage"})}>
                Next Page
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
  );
}
