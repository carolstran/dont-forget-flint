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
            <div id="completed-donation-wrapper">
                <h1 className="inapp-h1">Your Donation is Complete!</h1><br />
                <h2 id="complete-donation-h2">We have you down for <strong>${this.state.donationAmount} {this.state.donationFrequency}</strong>. You will be receiving an email soon regarding payment.</h2>
                <br />
                <div id="family-match-wrapper">
                    <div id="match-title-wrapper">
                        <h1>Meet the Flint Family Receiving Your Donation</h1>
                    </div>
                    <div id="match-rest">
                        <div className="family-match-image">
                            <img src={this.state.imageUrl || "/public/assets/blank-avatar.jpg"} />
                        </div>
                        <div className="family-match-text">
                            <h2>{this.state.familyName}</h2>
                            <p>{this.state.story}</p><br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
