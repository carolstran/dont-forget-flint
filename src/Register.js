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
            password: "",
            userType: 'donor',
            showButtons: true,
            toggleRegistrationForm: false
        };
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.changeUserType = this.changeUserType.bind(this);
        this.submitUserInfo = this.submitUserInfo.bind(this);
    }
    // showRegistrationForm(e) {
    //     this.setState({
    //         toggleRegistrationForm: !this.state.toggleRegistrationForm,
    //         showButtons: false
    //     });
    // }
    // setUserTypeToFamily(e) {
    //     this.setState({
    //         userType: 'recipient'
    //     });
    // }
    // setUserTypeToDonor(e) {
    //     this.setState({
    //         userType: 'donor'
    //     });
    // }
    submitUserInfo(e) {
        axios.post('/register', {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, userType: this.state.userType})
        .then((res) => {
            console.log(res.data.userType);
            if (res.data.userType == 'recipient') {
                location.replace('/form/')
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
                <h2 className="welcome-text">Connecting actual Flint families with potential donors.<br />
                Join us:</h2><br />
                    <div id="registration-form">
                        <label for="firstName" class="input-labels">First Name<em>*</em><br />
                            <input type="text" name="firstName" maxlength="250" onChange={this.handleUserInfo} required /><br />
                        </label><br />
                        <label for="lastName" class="input-labels">Last Name<em>*</em><br />
                            <input type="text" name="lastName" maxlength="250" onChange={this.handleUserInfo} required /><br />
                        </label><br />
                        <label for="email" class="input-labels">Email<em>*</em><br />
                            <input type="text" name="email" maxlength="250" onChange={this.handleUserInfo} required /><br />
                        </label><br />
                        <label for="password" class="input-labels">Password<em>*</em><br />
                            <input type="password" name="password" onChange={this.handleUserInfo} required /><br />
                        </label><br />
                        <label for="userType" className="selector-wrapper">I'm a<em>*</em><br />
                            <select className="styled-select" onChange={this.changeUserType}>
                                <option value="donor">Donor</option>
                                <option value="recipient">Family</option>
                            </select>
                        </label><br />
                        <button type="button" className="button" onClick={this.submitUserInfo}>SUBMIT</button>
                    </div><br />
                <p className="redirect-to">{'If you already have an account, please '}<Link to="/login/">{'log in'}</Link>.</p>
            </div>
        )
    }
}

// {this.state.showButtons &&
//     <div className="show-form-button-wrapper">
//     <button onClick={this.showRegistrationForm.bind(this) && this.setUserTypeToDonor.bind(this)} className="button">Register as a Donor</button>
//     <button onClick={this.showRegistrationForm.bind(this) && this.setUserTypeToFamily.bind(this)} className="button">Register as a Family</button>
//     </div>
// }
