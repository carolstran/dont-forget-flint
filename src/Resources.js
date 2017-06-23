import React from 'react';
import axios from './axios';

export class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="resources-wrapper">
                <h1 className="inapp-h1">Water Resource Sites</h1>
                <p>Bottled water, water filters, replacement cartridges and home water testing kits<br /> are currently available from 9 a.m. to 9 p.m. at the following water resource sites.</p><br />
                <div className="resource-address">
                    <p><strong>Fire Station #1</strong><br />
                    310 East 5th St.<br />
                    Flint, MI 48502</p><br />
                </div>
                <div className="resource-address">
                    <p><strong>Fire Station #3</strong><br />
                    1525 Martin Luther King Ave.<br />
                    Flint, MI 48503</p><br />
                </div>
                <div className="resource-address">
                    <p><strong>Fire Station #5</strong><br />
                    3402 Western Rd.<br />
                    Flint, MI 48506</p><br />
                </div>
                <div className="resource-address">
                    <p><strong>Fire Station #6</strong><br />
                    716 West Pierson Rd.<br />
                    Flint, MI 48505</p><br />
                </div>
                <div className="resource-address">
                    <p><strong>Fire Station #8</strong><br />
                    202 East Atherton Rd.<br />
                    Flint, MI 48507</p><br />
                </div>
            </div>
        )
    }
}
