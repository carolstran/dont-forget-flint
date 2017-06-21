import React from 'react';
import {Link} from 'react-router';

export class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="intro-wrapper">
                <h2 className="welcome-text">Welcome to Don't Forget Flint.<br />
                Connecting actual Flint families with potential donors.</h2><br />
                <br />
                <div id="register-buttons-wrapper">
                <Link to="/register/"><button type="button" className="button">Register</button></Link>
                <Link to="/login/"><button type="button" className="button">Login</button></Link>
                </div>
            </div>
        )
    }
}
