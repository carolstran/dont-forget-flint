import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import axios from './axios';
import {App} from './App';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="main-page">
                <h1>Hi {this.props.firstName}!</h1>
            </div>
        )
    }
}
