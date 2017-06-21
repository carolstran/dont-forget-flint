import React from 'react';
import axios from './axios';

export class Donate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donationAmount: "",
            donationFrequency: 'one time',
            donorMessage: "",
            additionalNotes: ""
        };
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.changeDonationFrequency = this.changeDonationFrequency.bind(this);
        this.submitUserInfo = this.submitUserInfo.bind(this);
    }
    submitUserInfo(e) {
        let donationAmount = this.state.donationAmount;
        let donationFrequency = this.state.donationFrequency;
        let donorMessage = this.state.donorMessage;
        let additionalNotes = this.state.additionalNotes;

        console.log('Submit user info is running! Here is the info', donationAmount, donationFrequency, donorMessage, additionalNotes);

        if (!donationAmount || !donationFrequency) {
            this.setState({
                notComplete: true
            });
        } else {
            axios.post('/placeDonation', {donationAmount: donationAmount, donationFrequency: donationFrequency, donorMessage: donorMessage, additionalNotes: additionalNotes})
            .then((res) => {
                location.replace('/donate/done/');
            }).catch((err) => {
                console.log('Unable to place donation', err);
                this.setState({
                    error: true
                });
            });
        }
    }
    changeDonationFrequency(e) {
        this.setState({
            donationFrequency: e.target.options[e.target.selectedIndex].value
        });
    }
    handleUserInfo(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div className="donate-page-wrapper">
                <h1>Place a donation here!</h1>
                <p>Fill out your information and find out which family you've helped.</p>
                <br />
                <h2>Here's what we need from you:</h2>
                {this.state.error && <div className="error-message">{'Something went wrong! Please try again.'}</div>}
                {this.state.notComplete && <div className="error-message">{'You must fill out every field to continue.'}</div>}
                <div id="donation-form">
                    <label for="donationAmount" class="input-labels">Donation Amount<em>*</em><br />
                        <p id="dollar-sign">$</p><input type="number" id="amount-input" name="donationAmount" onChange={this.handleUserInfo} required /><br />
                    </label><br />
                    <label for="donationFrequency" className="selector-wrapper">How Often<em>*</em><br />
                        <select className="styled-select" onChange={this.changeDonationFrequency}>
                            <option value="one time">One Time</option>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </label><br />
                    <label for="donorMessage" class="input-labels">Write a Message to the Family<br />
                        <textarea type="text" name="donorMessage" onChange={this.handleUserInfo} /><br />
                    </label><br />
                    <label for="additionalNotes" class="input-labels">Any Notes for the Organizers<br />
                        <textarea type="text" name="additionalNotes" onChange={this.handleUserInfo} /><br />
                    </label><br />
                    <button type="button" className="button" onClick={this.submitUserInfo}>DONATE</button>
                </div>
            </div>
        )
    }
}
