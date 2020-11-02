import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonsList from './pages/main';
import PokemonDetails from './pages/details';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={PokemonsList} />
                <Route path='/details/:id' component={PokemonDetails} />
            </Switch>
        </Router>
    )
}

