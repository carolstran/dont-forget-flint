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
    componentDidMount() {
        axios.get('/userProfile').then((res) => {
            const { id, firstName, userType } = res.data;
            this.setState({ id, firstName, userType });
        });
    }
    handleLogout(e) {
        e.preventDefault();
        axios.get('/logout').then((res) => {
            location.replace('/');
        });
    }
    render() {
        const { id, firstName, userType } = this.state;
        const children = React.cloneElement(this.props.children, { id, firstName, userType });

        if (this.state.userType == 'recipient') {
            return (
                <div id="main-page">
                    <div id="nav-bar">
                        <Logo />
                        <div id="nav-links">
                            <Link to="/">Home</Link><br />
                            <Link to="">Resources</Link><br />
                            <Link to="/profile/">Profile</Link><br />
                            <Link onClick={this.handleLogout}>Logout</Link><br />
                        </div>
                    </div>
                    <hr width="1" size="500"></hr>
                    <div className="children">
                        {children}
                    </div>
                </div>
            )
        } else {
            return (
                <div id="main-page">
                    <div id="nav-bar">
                        <Logo />
                        <div id="nav-links">
                            <Link to="/">Home</Link><br />
                            <Link to="">Donate</Link><br />
                            <Link to="/profile/">Profile</Link><br />
                            <Link onClick={this.handleLogout}>Logout</Link><br />
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
}
