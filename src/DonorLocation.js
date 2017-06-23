import React from 'react';
import {Profile} from './Profile';

export function DonorLocation(props) {
    return (
        <div id="location-wrapper">
            <p className="actual-location">{props.location}</p><br />
            <button className="button location-button" onClick={props.toggleEditInfo}>&gt; Edit Your Location</button>
        </div>
    )
}
