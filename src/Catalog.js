import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';

function Catalog() {
    const [character, setCharacter] = useState([]);

    const baseURL = 'https://rickandmortyapi.com/api/character/';

    useEffect(() => {
        const getStatusInterval = setInterval(() => {
                axios.get(baseURL, {})
                    .then(({data}) => {
                        setCharacter(data.results);
                    })
            }, 2000
        );
        return () => {
            clearInterval(getStatusInterval);
        }
    });

    const characters = character.map((character) =>
        <div className="characterCard">
            <img className="characterImage" src={character.image} alt=""/>
            <p key={character.id}>[{character.id}] {character.name} - {character.status}</p>
        </div>);

    return (
        <div className="background">
                {characters}
            <div className="card">
                <Button>
                    <a href="/">Search character</a>
                </Button>
            </div>
        </div>

    );
}

export default Catalog;
