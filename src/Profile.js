import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import axios from './axios';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.props.userType == 'donor') {
            return (
                <div id="profile-page">
                    <h1>DONOR TESTING</h1>
                    <h2>We'd love to know more about you to tell the family that receives your donation.</h2>

                    <p>Upload an image of yourself</p>
                    <p>Where are you from?</p>
                </div>
            )
        } else {
            return (
                <div id="profile-page">
                <h1>FAMILY TESTING</h1>
                </div>
            )
        }
    }
}
