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
                const { id, firstName, userType } = res.data;
                this.setState({ id, firstName, userType });
            });
        } else {
            axios.get('/getDonationsReceived').then((res) => {
                const { id, firstName, userType } = res.data;
                this.setState({ id, firstName, userType });
            });
        }
    }
    render() {
        if (this.props.userType == 'donor') {
            if
            return (
                <div id="home-wrapper">
                    <h1>Hi {this.props.firstName}! You're a donor.</h1>
                    <h1>Your donations will show here.</h1>
                </div>
            )
        } else {
            return (
                <div id="home-wrapper">
                    <h1>Hi {this.props.firstName}! You're a family.</h1>
                    <h1>We're happy you're here.</h1>
                </div>
            )
        }
    }
}
