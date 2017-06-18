import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import axios from './axios';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.props.userType == 'recipient') {
            return (
                <div id="profile-page">
                <h1>FAMILY TESTING</h1>
                </div>
            )
        } else {
            return (
                <div id="profile-page">
                <h1>DONOR TESTING</h1>
                </div>
            )
        }
    }
}
