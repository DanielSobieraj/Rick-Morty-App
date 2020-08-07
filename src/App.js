import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

function App() {
    const [name, setName] = useState("John Doe");
    const [status, setStatus] = useState();
    const [imageURL, setImageURL] = useState();

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
                        setImageURL(result.image)
                    })
                    .catch(() =>
                        setStatus('doesn\'t exist'));
            }, 1000
        );

        return () => {
            clearInterval(getStatusInterval);
        }
    });

    return (
        <div className="App">
            <img src={imageURL}/>
            <h2>Say hello the classy way, my dear {name}</h2>
            <h2>{name}: Hello, I'm {status}</h2>
            <TextField
                onChange={(e) => setName(e.target.value)}
                label="Type name of character"/>
        </div>
    );
}

export default App;
