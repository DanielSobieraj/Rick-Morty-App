import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';
import {Link} from "react-router-dom";


function App() {
    const [character, setCharacter] = useState({
            name: 'John Doe',
            imageURL: 'https://i0.wp.com/eagleeye.news/wp-content/uploads/2017/10/rick-and-morty-e1507831459637.jpg'
        }
    );

    const baseURL = 'https://rickandmortyapi.com/api/character/';

    useEffect(() => {
        const getStatusInterval = setInterval(() => {
                axios.get(baseURL, {
                    params: {
                        name: `${character.name}`
                    }
                })
                    .then(({data}) => {
                        const result = data.results[0];
                        setCharacter({
                            name: result.name,
                            status: `'m ${result.status}`,
                            imageURL: result.image,
                            species: `& ${result.species}`,
                            location: result.location.name
                        });
                    })
                    .catch(() => {
                        setCharacter({
                            name: 'Nobody',
                            status: ' don\'t exist',
                            species: '',
                            location: 'I don\'t know',
                            imageURL: 'https://i0.wp.com/eagleeye.news/wp-content/uploads/2017/10/rick-and-morty-e1507831459637.jpg'
                        })
                    })
            }, 2000
        );
        return () => {
            clearInterval(getStatusInterval);
        }
    });

    const characterHandler = (e) => setCharacter({name: e.target.value});

    return (
        <div className="background">
            <div className="container">
                <div className="card__box">
                    <div className="app">
                        <img src={character.imageURL} alt={character.name}/>
                        <p className="main__text">{`Say hello the classy way, my dear ${character.name}`}</p>

                        <p className="main__text">
                            <span> {character.name}</span>: Hello,
                            I<span>{character.status} {character.species}</span><br/> Last know
                            location: <br/><span>{character.location}</span>
                        </p>
                        <TextField
                            onChange={characterHandler}
                        />
                        <br/>
                        <Link to="/catalog">
                            <Button>Character catalog</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
