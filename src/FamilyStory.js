import React from 'react';
import {Profile} from './Profile';

export function FamilyStory(props) {
    return (
        <div id="story-wrapper">
            <p className="actual-story">{props.story}</p><br />
            <button className="button" onClick={props.toggleEditInfo}>&gt; Edit Your Story</button>
        </div>
    )
}
