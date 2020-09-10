import React, {useEffect, useState, useReducer} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";

function reducer(state, action) {
    switch (action.type) {
        case 'nextPage':
            return state = state + 1;
        case 'prevPage' :
            if (state === 1) {
                return state = 1
            } else {
                return state = state - 1;
            }
        default:
            return state
    }
}

export function Catalog() {
    const baseURL = 'https://rickandmortyapi.com/api/character/?';
    const [character, setCharacter] = useState([]);
    const [state, dispatch] = useReducer(reducer, 1);

    useEffect(() => {
        axios.get(`${baseURL}page=${state}`, {})
            .then(({data}) => {
                setCharacter(data.results);
            })
    }, [state]);

    function nextPage() {
        dispatch({type: 'nextPage'});
        console.log(state);
    }

    function prevPage() {
        dispatch({type: 'prevPage'});
        console.log(`${baseURL}page=${state}`);
    }

    const characters = character.map((character) =>
        <div className="character__card" key={character.id}>
            <img className="character__image" src={character.image} alt={character.name}/>
            <p key={character.id}>[{character.id}] {character.name} - <span>{character.status}</span></p>
        </div>);

    return (
        <div className="background">
            <div className="container">
                {characters}
                <div className="footer">
                    <Link to="/">
                        <Button>
                            Search character
                        </Button>
                    </Link>
                    <div className="buttons">
                        <Button onClick={prevPage}>Prev Page</Button>
                        <Button onClick={nextPage}>Next Page</Button>
                    </div>
                </div>
            </div>
        </div>


    );
}
