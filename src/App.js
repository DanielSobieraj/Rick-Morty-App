import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {TextField} from '@material-ui/core';

function App() {
    const [name, setName] = useState("John Doe");
    const [status, setStatus] = useState(' unknown');
    const [imageURL, setImageURL] = useState('https://www.geekfeed.com/wp-content/uploads/2019/07/16-Rick-and-Morty-4-300x300.jpg');
    const [species, setSpecies] = useState('');
    const [location, setLocation] = useState('Who knows');


    useEffect(() => {
        const getStatusInterval = setInterval(() => {
                axios.get('https://rickandmortyapi.com/api/character/', {
                    params: {
                        name: `${name}`
                    }
                })
                    .then(({data}) => {
                        const result = data.results[0];
                        setName(result.name);
                        setStatus('\'m ' + result.status);
                        setImageURL(result.image);
                        setSpecies('& ' + result.species);
                        setLocation(result.location.name)
                    })
                    .catch(() => {
                        setStatus(' don\'t exist');
                        setSpecies('');
                        setLocation('I don\'t know');
                        setImageURL('https://www.geekfeed.com/wp-content/uploads/2019/07/16-Rick-and-Morty-4-300x300.jpg')
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
                    <img src={imageURL}/>
                    <h2>Say hello the classy way,<br/> my dear <span>{name}</span></h2>
                    <h2>{name}:<br/> Hello, I<span>{status} {species}</span></h2>
                    <h2>Last know location: <br/><span>{location}</span></h2>
                    <TextField
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        label="Type name of character"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
