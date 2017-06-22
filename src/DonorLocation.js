import React from 'react';
import {Profile} from './Profile';

export function DonorLocation(props) {
    return (
        <div id="location-wrapper">
            <p className="actual-location">{props.location}</p>
            <button className="button" onClick={props.toggleEditInfo}>Edit Your Location</button>
        </div>
    )
}
