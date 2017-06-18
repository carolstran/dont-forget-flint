import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from './axios';

import {Welcome} from './Welcome';
import {Login} from './Login';
import {Register} from './Register';
import {FamilyForm} from './FamilyForm'

import {App} from './App';
import {Home} from './Home';
import {Profile} from './Profile';

let elem;

const loggedOutRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login/" component={Login} />
            <Route path="/form/" component={FamilyForm} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
)

const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/profile/" component={Profile} />
            <IndexRoute component={Home} />
        </Route>
    </Router>
)

// const loggedInRouterFamilies = (
//     <Router history={browserHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={Home} />
//         </Route>
//     </Router>
// )



if (location.pathname == '/welcome') {
    elem = loggedOutRouter;
} else {
    elem = loggedInRouter;
}

// else if (location.pathname == '/donor') {
//     elem = loggedInRouterDonors;
// } else if (location.pathname == '/family') {
//     elem = loggedInRouterFamilies;
// }

ReactDOM.render(elem, document.getElementById('main'));
