import React from 'react';
import axios from './axios';

export class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // 
    }
    render() {
        return (
            <div className="completed-donation-wrapper">
                <h1>The donation is complete!</h1>
            </div>
        )
    }
}
