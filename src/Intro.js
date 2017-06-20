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
                <h2 className="welcome-text">Welcome to Don't Forget Flint.</h2><br />
                <p className="welcome-text">Something sort of introduction.</p><br />
                <br />
                <div id="register-buttons-wrapper">
                <Link to="/register/"><button type="button" className="button">Register as a Donor</button></Link>
                <Link to="/register/"><button type="button" className="button">Register as a Family</button></Link>
                </div>
                <p className="redirect-to">{'If you already have an account, please '}<Link to="/login/">{'log in'}</Link>.</p>
            </div>
        )
    }
}
