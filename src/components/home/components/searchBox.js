import React, {useEffect, useState} from "react";
import {Box, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import axios from "axios";

const SearchBox = () => {
    const baseURL = "https://rickandmortyapi.com/api/character";
    const [character, setCharacter] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get(`${baseURL}`, {}).then(({data}) => {
            setCharacter(data.results);
        });
    }, []);

    const characterCheck = () => {
        if (character.map((character) => character.name) == name) {
            console.log(character.name);
        }
    };


    return (
        <Box style={{width: 300}}>
            <p>{name}</p>
            <Autocomplete
                freeSolo
                disableClearable
                onInputChange={(e, setInputName) => setName(setInputName)}
                options={character.map((character) => character.name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Enter a character"
                        margin="normal"
                        variant="outlined"
                        InputProps={{...params.InputProps, type: "search"}}
                    />
                )}
            />
        </Box>
    );
};

export default SearchBox;
