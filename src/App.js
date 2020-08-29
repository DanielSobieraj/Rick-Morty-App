import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {TextField} from '@material-ui/core';

function App() {
    const [character, setCharacter] = useState({
            name: 'John Doe',
            status: ' unknown',
            imageURL: 'https://i0.wp.com/eagleeye.news/wp-content/uploads/2017/10/rick-and-morty-e1507831459637.jpg',
            species: '',
            location: 'Who knows'
        }
    );


    useEffect(() => {
        const getStatusInterval = setInterval(() => {
                axios.get('https://rickandmortyapi.com/api/character/', {
                    params: {
                        name: `${character.name}`
                    }
                })
                    .then(({data}) => {
                        const result = data.results[0];
                        setCharacter({
                            name: result.name,
                            status: '\'m ' + result.status,
                            imageURL: result.image,
                            species: '& ' + result.species,
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

    return (
        <div className="background">
            <div className="card-box">
                <div className="App">
                    <img src={character.imageURL}/>
                    <h2>Say hello the classy way,<br/> my dear <span>{character.name}</span></h2>
                    <h2>{character.name}:<br/> Hello, I<span>{character.status} {character.species}</span></h2>
                    <h2>Last know location: <br/><span>{character.location}</span></h2>
                    <TextField
                        type="text"
                        onChange={(e) => setCharacter({name: e.target.value})}
                        label="Type name of character"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
