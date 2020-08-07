import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {TextField} from '@material-ui/core';

function App() {
    const [name, setName] = useState("John Doe");
    const [status, setStatus] = useState('unknown');
    const [imageURL, setImageURL] = useState('https://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif');
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
                        setStatus(result.status);
                        setImageURL(result.image);
                        setSpecies('& ' + result.species);
                        setLocation(result.location.name)
                    })
                    .catch(() => {
                        setStatus('doesn\'t exist');
                        setSpecies('');
                        setLocation('I don\'t know');
                        setImageURL('https://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif')
                    })
            }, 1500
        );
        return () => {
            clearInterval(getStatusInterval);
        }
    });

    return (
        <div className="App">
            <img src={imageURL}/>
            <h2>Say hello the classy way,<br/> my dear <span>{name}</span></h2>
            <h2><span>{name}:</span><br/> Hello, I'm <span>{status} {species}</span></h2>
            <h2>Last know location: <br/><span>{location}</span></h2>
            <TextField
                type="text"
                onChange={(e) => setName(e.target.value)}
                label="Type name of character"
            />
        </div>
    );
}

export default App;
