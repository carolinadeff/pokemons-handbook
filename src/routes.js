import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PokemonsList from './pages/main';
import PokemonDetails from './pages/details';

export default function Routes() {
    return (
        <Router>
            <Switch>

                <Route path='/list' component={PokemonsList} />
                <Route path='/details/:id' component={PokemonDetails} />

                <Redirect from='/' to='list'/>

            </Switch>
        </Router>
    )
}

