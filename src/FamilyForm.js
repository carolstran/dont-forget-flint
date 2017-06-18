import React from 'react';
import axios from './axios';
import {Link, hashHistory} from 'react-router';

export class FamilyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            familyName: "",
            familyMembers: "",
            address: "",
            city: "Flint",
            state: "MI",
            zipCode: ""
        };
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.submitUserInfo = this.submitUserInfo.bind(this);
    }
    submitUserInfo(e) {
        axios.post('/submitRecipientInfo', {familyName: this.state.familyName, familyMembers: this.state.familyMembers, address: this.state.address, city: this.state.city, state: this.state.state, zipCode: this.state.zipCode})
        .then((result) => {
            location.replace('/');
        }).catch((err) => {
            console.log('Unable to submit user info', err);
            this.setState({
                error: true
            });
        });
    }
    handleUserInfo(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div id="family-form-wrapper">
                {this.state.error && <div className="error-message">{'Something went wrong! Please try again.'}</div>}
                <h2>Please fill out this additional information.</h2><br />
                <p>Something about consenting to give your address to an outside water company.</p><br />
                <div id="family-form">
                    <label for="familyName" class="input-labels">Family Name:<br />
                        <input type="text" name="familyName" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="familyMembers" class="input-labels">Number of Family Members:<br />
                        <input type="number" id="family-members-input" name="familyMembers" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="address" class="input-labels">Address:<br />
                        <input type="text" name="address" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="city" class="input-labels">City:<br />
                        <input type="text" value="Flint" name="city" maxlength="50" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="state" class="input-labels">State:<br />
                        <input type="text" id="state-input" value="MI" name="state" maxlength="50" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="zipCode" class="input-labels">Zip Code:<br />
                        <input type="number" id="zip-code-input" name="zipCode" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <button type="button" className="button" onClick={this.submitUserInfo}>CONTINUE</button>
                </div><br />
            </div>
        )
    }
}
