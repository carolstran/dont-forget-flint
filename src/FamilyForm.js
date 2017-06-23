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
            zipCode: "",
            hasFilledOutForm: false
        };
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.submitUserInfo = this.submitUserInfo.bind(this);
    }
    componentWillUnmount() {
        if (this.state.hasFilledOutForm == false) {
            location.replace('/form/')
        }
    }
    submitUserInfo(e) {
        let familyName = this.state.familyName;
        let familyMembers = this.state.familyMembers;
        let address = this.state.address;
        let city = this.state.city;
        let state = this.state.state;
        let zipCode = this.state.zipCode;

        if (!familyName || !familyMembers || !address || !city || !state || !zipCode) {
            this.setState({
                notComplete: true
            });
        } else {
            axios.post('/submitRecipientInfo', {familyName: familyName, familyMembers: familyMembers, address: address, city: city, state: state, zipCode: zipCode})
            .then((res) => {
                this.state.hasFilledOutForm = true;
                location.replace('/');
            }).catch((err) => {
                console.log('Unable to submit user info', err);
                this.setState({
                    error: true
                });
            });
        }
    }
    handleUserInfo(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div id="family-form-wrapper">
                <h2>Just one more step! All fields are required.</h2>
                {this.state.error && <div className="error-message">{'Something went wrong! Please try again.'}</div>}
                {this.state.notComplete && <div className="error-message">{'You must fill out every field to continue.'}</div>}
                <div id="family-form">
                    <label for="familyName" id="name-label" class="input-labels">Family Name<em>*</em><br />
                        <input type="text" name="familyName" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="familyMembers" id="members-label" class="input-labels">Number of Family Members<em>*</em><br />
                        <input type="number" id="family-members-input" name="familyMembers" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="address" id="address-label" class="input-labels">Address<em>*</em><br />
                        <input type="text" name="address" maxlength="250" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="city" id="city-label" class="input-labels">City<em>*</em><br />
                        <input type="text" value="Flint" name="city" maxlength="50" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="state" id="state-label" class="input-labels">State<em>*</em><br />
                        <input type="text" id="state-input" value="MI" name="state" maxlength="50" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="zipCode" id="zipcode-label" class="input-labels">Zip Code<em>*</em><br />
                        <input type="number" id="zip-code-input" name="zipCode" onChange={this.handleUserInfo} required /><br />
                    </label><br /><br />
                    <button type="button" id="continue-button" className="button" onClick={this.submitUserInfo}>&gt; CONTINUE</button>
                </div><br />
            </div>
        )
    }
}
