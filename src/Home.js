import React from 'react';
import {Link} from 'react-router';
import axios from './axios';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayFamilyInfo: false
        };
        this.toggleFamilyInfo = this.toggleFamilyInfo.bind(this);
    }
    componentDidMount() {
        if (this.props.userType == 'donor') {
            axios.get('/getDonationsMade').then((res) => {
                this.setState({
                    donationsMade: res.data.donationsMade
                });
            });
        } else if (this.props.userType == 'recipient') {
            axios.get('/getDonationsReceived').then((res) => {
                this.setState({
                    donationsReceived: res.data.donationsReceived
                });
            });
        }
    }
    toggleFamilyInfo() {
        this.setState({
            displayFamilyInfo: !this.state.displayFamilyInfo
        });
    }
    render() {
        if (this.props.userType == 'donor') {
            if (this.state.donationsMade && this.state.donationsMade.length) {
                return (
                    <div className="home-wrapper">
                        <div className="donations-wrapper">
                            <h1 className="inapp-h1">Donations You've Made</h1><br />
                                    <div id="donations-made-wrapper" className="single-donation">
                                        <table id="table-header">
                                            <thead>
                                                <tr>
                                                    <th id="date-placed">Date Placed</th>
                                                    <th id="amount">Amount</th>
                                                    <th>How Often</th>
                                                    <th>Family</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        </div>
                                        {this.state.donationsMade && this.state.donationsMade.map(donation => {
                                            return (
                                                <div>
                                                    <table id="table-body">
                                                        <tbody>
                                                            <tr>
                                                                <td>{donation.created_at}</td>
                                                                <td>${donation.donation_amount}</td>
                                                                <td className="how-often">{donation.donation_frequency}</td>
                                                                <td className="table-family">{donation.family_name}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table><br />
                                                </div>
                                            )
                                        })}
                            </div>
                        <div className="families-wrapper">
                            <h1 className="inapp-h1">Families You've Helped</h1>
                            {this.state.donationsMade && this.state.donationsMade.map(donation => {
                                return (
                                    <div className="single-family">
                                        <div className="family-image">
                                            <img src={donation.image_url || "/public/assets/blank-avatar.jpg"} onClick={this.toggleFamilyInfo} />
                                        </div>
                                        {this.state.displayFamilyInfo &&
                                            <div className="text-wrapper">
                                                <h2 className="donation-name">{donation.family_name}</h2>
                                                <p className="story-message">{donation.story}</p>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="home-wrapper">
                        <h1 className="inapp-h1">Hey {this.props.firstName}, it's nice to see you!</h1>
                        <div className="home-content">
                            <h2>Here's how to get started on Don't Forget Flint:</h2>
                            <ol className="home-list">
                                <li>Update your <Link to="/profile/">profile</Link></li>
                                <li>Make your first <Link to="/donate/">donation</Link></li>
                                <li>Get to know the Flint family you've helped</li>
                            </ol>
                        </div>
                    </div>
                )
            }
        } else {
            if (this.state.donationsReceived && this.state.donationsReceived.length) {
                return (
                    <div className="donations-wrapper">
                        <h1 className="inapp-h1">Donations You've Received</h1><br />
                        {this.state.donationsReceived && this.state.donationsReceived.map(donation => {
                            return (
                                <div className="single-donation">
                                    <div className="donation-image">
                                        <img src={donation.image_url || "/public/assets/blank-avatar.jpg"} />
                                    </div>
                                    <div className="donation-text">
                                        <h2 className="donation-name">{donation.first_name} {donation.last_name} in {donation.location}<br />
                                        Donated ${donation.donation_amount} {donation.donation_frequency}</h2>
                                        <p className="story-message">"{donation.donor_message}"</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            } else {
                return (
                    <div className="home-wrapper">
                        <h1 className="inapp-h1">Hi there, {this.props.firstName}! We're happy to see you.</h1>
                        <div className="home-content">
                            <h2>Here's how to get started on Don't Forget Flint:</h2>
                            <ol className="home-list">
                                <li>Update your <Link to="/profile/">profile</Link></li>
                                <li>Check out our <Link to="#">resources</Link> page</li>
                                <li>Once you receive a donation - you'll be notified on this page</li>
                            </ol>
                        </div>                    </div>
                )
            }
        }
    }
}
