import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";

export function Catalog() {
    const [character, setCharacter] = useState([]);

    const baseURL = 'https://rickandmortyapi.com/api/character/';

    useEffect(() => {
        axios.get(baseURL, {})
            .then(({data}) => {
                setCharacter(data.results);
            })
    }, []);


    function nextPage() {
        axios.get(`${baseURL}?page=2`)
            .then(({data}) => {
                setCharacter(data.results);
            })
    }

    function prevPage() {
        axios.get(`${baseURL}?page=1`)
            .then(({data}) => {
                setCharacter(data.results);
            })
    }

    const characters = character.map((character) =>
        <div className="characterCard">
            <img className="characterImage" src={character.image} alt={character.name}/>
            <p key={character.id}>[{character.id}] {character.name} - {character.status}</p>
        </div>);

    return (
        <div className="background">
            {characters}
            <div className="card">
                <Link to="/">
                    <Button>
                        Search character
                    </Button>
                </Link>
                <button onClick={prevPage}>Prev Page</button>
                <button onClick={nextPage}>Next Page</button>
            </div>
        </div>



    );
}
