import React from 'react';
import axios from './axios';

export class CompletedDonation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/latestDonation')
        .then((res) => {
            const { donationAmount, donationFrequency, familyName, imageUrl, story } = res.data;
            this.setState({ donationAmount, donationFrequency, familyName, imageUrl, story });
        });
    }
    render() {
        return (
            <div className="completed-donation-wrapper">
                <h1>The donation is complete!</h1><br />
                <h3>Here are the details</h3><br />
                <br />
                <p>Donation Amount: ${this.state.donationAmount}</p><br />
                <p>Frequency: {this.state.donationFrequency}</p><br />
                <br />
                <h3>Here's who you helped</h3>
                <p>Family: {this.state.familyName}</p><br />
                <img src={this.state.imageUrl || "/public/assets/blank-avatar.jpg"} /><br />
                <p>Their story: {this.state.story}</p><br />
            </div>
        )
    }
}
