import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './index.css';
import * as serviceWorker from './services/serviceWorker';

import Home from './components/home/home';
import {catalog, home} from './common/routes'
import {Catalog} from "./components/catalog/catalog";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route
                    path={catalog}
                    component={Catalog}
                    exact
                />
                <Route
                    path={home}
                    component={Home}
                    exact
                />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
