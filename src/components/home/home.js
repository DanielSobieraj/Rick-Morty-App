import "./home.css";
import React from "react";
import {Box, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {catalog} from "../../common/routes";
import SearchBox from "./components/searchBox";

const Home = () => {
    return (
        <Box className="background">
            <Box className="container">
                <Box className="card__box">
                    <Box className="app">
                        <SearchBox/>
                        <Box>
                            <Link to={catalog}>
                                <Button>Character catalog</Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
