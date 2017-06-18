import React from 'react';

export function Welcome(props) {
    return (
        <div id="welcome-wrapper">
            <img id="logo-large" src="./public/assets/flintlogo.png" />
            {props.children}
        </div>
    );
}
