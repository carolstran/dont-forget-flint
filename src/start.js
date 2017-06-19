import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from './axios';

import {Welcome} from './Welcome';
import {Login} from './Login';
import {Register} from './Register';

import {App} from './App';
import {Home} from './Home';
import {Profile} from './Profile';

import {Donate} from './Donate';

import {FamilyForm} from './FamilyForm';
import {Resources} from './Resources';

let elem;

const loggedOutRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login/" component={Login} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
)

const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/profile/" component={Profile} />
            <Route path="/form/" component={FamilyForm} />
            <Route path="/donate/" component={Donate} />
            <Route path="/resources/" component={Resources} />
            <IndexRoute component={Home} />
        </Route>
    </Router>
)

if (location.pathname == '/welcome') {
    elem = loggedOutRouter;
} else {
    elem = loggedInRouter;
}

ReactDOM.render(elem, document.getElementById('main'));
