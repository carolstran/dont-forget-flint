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
                <h2 className="welcome-text">Flint has been without clean water since April 25, 2014.<br />
                So we're connecting actual Flint families with water donors.</h2><br />
                <br />
                <div id="register-buttons-wrapper">
                <Link to="/register/"><button type="button" className="button">&gt; Register</button></Link>
                <Link to="/login/"><button type="button" className="button">&gt; Login</button></Link>
                </div>
            </div>
        )
    }
}
