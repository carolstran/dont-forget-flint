import React from 'react';
import axios from './axios';
import {Link, hashHistory} from 'react-router';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.changeUserType = this.changeUserType.bind(this);
        this.submitUserInfo = this.submitUserInfo.bind(this);
    }
    submitUserInfo(e) {
        axios.post('/register', {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, userType: this.state.userType})
        .then((res) => {
            if (res.data.userType == 'recipient') {
                location.replace('/familyform')
            } else {
                location.replace('/');
            }
        }).catch((err) => {
            console.log('Unable to submit user info', err);
            this.setState({
                error: true
            });
        });
    }
    changeUserType(e) {
        this.setState({
            userType: e.target.options[e.target.selectedIndex].value
        });
    }
    handleUserInfo(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div id="registration-wrapper">
                {this.state.error && <div className="error-message">{'Something went wrong! Please try again.'}</div>}
                <h2 className="welcome-text">Intro text of some kind.</h2><br />
                <h2 className="welcome-text">Join us:</h2><br />
                <div id="registration-form">
                    <label for="firstName" class="input-labels">First Name:<br />
                        <input type="text" name="firstName" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="lastName" class="input-labels">Last Name:<br />
                        <input type="text" name="lastName" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="email" class="input-labels">Email:<br />
                        <input type="text" name="email" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="userType" className="selector-wrapper">I'm a:<br />
                        <select className="styled-select" onChange={this.changeUserType}>
                            <option value="donor">Donor</option>
                            <option value="recipient">Family</option>
                        </select>
                    </label><br />
                    <label for="password" class="input-labels">Password:<br />
                        <input type="password" name="password" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <button type="button" className="button" onClick={this.submitUserInfo}>SUBMIT</button>
                </div><br />
                <p className="redirect-to">{'If you already have an account, please '}<Link to="/login">{'log in'}</Link>.</p>
            </div>
        )
    }
}
