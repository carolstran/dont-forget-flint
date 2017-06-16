import React from 'react';

export function Welcome(props) {
    return (
        <div id="welcome-wrapper">
            <h1 id="logo-large">LARGE LOGO HERE</h1>
            {props.children}
        </div>
    );
}

// <img id="logo-large" src="./public/assets/" />
