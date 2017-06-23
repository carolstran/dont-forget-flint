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
                <h1 className="inapp-h1">Make a Donation</h1>
                {this.state.error && <div className="error-message">{'Something went wrong! Please try again.'}</div>}
                {this.state.notComplete && <div className="error-message">{'You must fill out every field to continue.'}</div>}
                <div id="donation-form">
                    <label for="donationAmount" class="input-labels">Amount<em>*</em><br />
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
                    <button type="button" className="button" onClick={this.submitUserInfo}>&gt; Submit</button>
                </div><br />
                <h1 className="inapp-h1">Here's How We See It:</h1><br />
                <img src="/public/assets/bottles.png" />
            </div>
        )
    }
}
