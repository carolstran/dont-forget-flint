import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import axios from './axios';

import Logo from './Logo';
import {Home} from './Home';
import {Profile} from './Profile'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { id, firstName, lastName, email, userType } = this.state;
        const children = React.cloneElement(this.props.children, { id, firstName, lastName, email, userType });
        return (
            <div id="main-page">
                <div id="nav-bar">
                    <Logo />
                    <div id="nav-links">
                        <Link to="">LINK 1</Link><br />
                        <Link to="">LINK 2</Link><br />
                        <Link to="">LINK 3</Link><br />
                    </div>
                </div>
                <hr width="1" size="500"></hr>
                <div className="children">
                    {children}
                </div>
            </div>
        )
    }
}
