import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import axios from './axios';
import {App} from './App';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (this.props.userType == 'donor') {
            axios.get('/getDonationsMade').then((res) => {
                this.setState({
                    donationsMade: res.data.donationsMade
                });
            });
        } else {
            axios.get('/getDonationsReceived').then((res) => {
                this.setState({
                    donationsReceived: res.data.donationsReceived
                });
            });
        }
    }
    render() {
        if (this.props.userType == 'donor') {
            if (this.state.donationsMade) {
                return (
                    <div className="donations-wrapper">
                        <h1>Hey {this.props.firstName}! Here are the donations you've made.</h1><br />
                        {this.state.donationsMade && this.state.donationsMade.map(donation => {
                            return (
                                <div id="donations-made-wrapper" className="single-donation">
                                    <div className="donation-image">
                                        <img src={donation.image_url || "/public/assets/blank-avatar.jpg"} />
                                    </div>
                                    <h3 className="donation-name">{donation.family_name}</h3><br />
                                    <p className="story-message">{donation.story}</p>
                                    <p>You committed to a {donation.donation_frequency} donation of ${donation.donation_amount}.</p>
                                </div>
                            )
                        })}
                    </div>
                )
            } else {
                return (
                    <div className="home-wrapper">
                        <h1>Hi {this.props.firstName}! Looks like you haven't made a donation yet.</h1>
                        <p>Why don't you go make one <Link to="/donate/">here</Link></p>
                    </div>
                )
            }
        } else {
            if (this.state.donationsReceived) {
                return (
                    <div className="donations-wrapper">
                        <h1>Hey {this.props.firstName}! Here are the donations you've received.</h1><br />
                        {this.state.donationsReceived && this.state.donationsReceived.map(donation => {
                            return (
                                <div id="donations-received-wrapper" className="single-donation">
                                    <div className="donation-image">
                                        <img src={donation.image_url || "/public/assets/blank-avatar.jpg"} />
                                    </div>
                                    <h3 className="donation-name">{donation.first_name} {donation.last_name} from {donation.location} committed to a {donation.donation_frequency} donation of ${donation.donation_amount}.</h3><br />
                                    <p className="story-message">{donation.donor_message}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            } else {
                return (
                    <div className="home-wrapper">
                        <h1>Hi {this.props.firstName}! Looks like you haven't received any donations yet.</h1>
                        <p>Don't worry one will come soon! In the meantime, check out these <Link to="/resources/">resources</Link></p>
                    </div>
                )
            }
        }
    }
}
