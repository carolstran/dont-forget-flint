import React from 'react';
import {Profile} from './Profile';

export function FamilyStory(props) {
    return (
        <div id="story-wrapper">
            <p className="actual-story">{props.story}</p>
            <button className="button" onClick={props.toggleEditInfo}>Edit Your Story</button>
        </div>
    )
}
