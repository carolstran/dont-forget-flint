import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import axios from './axios';

import Logo from './Logo';
import {FamilyForm} from './FamilyForm';
import {Home} from './Home';
import {Profile} from './Profile'
import {EditInfo} from './EditInfo';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setImage = this.setImage.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateStory = this.updateStory.bind(this);
    }
    componentWillMount() {
        axios.get('/userProfile').then((res) => {
            const { id, firstName, lastName, email, userType, imageUrl, location, familyName, story } = res.data;
            this.setState({ id, firstName, lastName, email, userType, imageUrl, location, familyName, story });
        });
    }
    handleLogout(e) {
        e.preventDefault();
        axios.get('/logout').then((res) => {
            location.replace('/');
        });
    }
    setImage(url) {
        console.log(url);
        this.setState({
            imageUrl: url
        });
    }
    updateLocation(data) {
        this.setState({
            location: data.location,
            showEditInfo: false
        });
    }
    updateStory(data) {
        this.setState({
            story: data.story,
            showEditInfo: false
        });
    }
    render() {
        console.log(this.state.imageUrl);
        const { id, firstName, lastName, email, userType, imageUrl, location, familyName, story } = this.state;
        const children = React.cloneElement(this.props.children, { id, firstName, lastName, email, userType, setImage: this.setImage, imageUrl, updateLocation: this.updateLocation, location, familyName, updateStory: this.updateStory, story });

        if (this.state.userType == 'donor') {
            return (
                <div id="app-wrapper">
                    <div id="nav-bar">
                        <Logo />
                        <div id="nav-links">
                            <Link to="/">Home</Link><br />
                            <Link to="/donate/">Donate</Link><br />
                            <Link to="/profile/">Profile</Link><br />
                            <Link onClick={this.handleLogout}>Logout</Link><br />
                        </div>
                    </div>
                    <hr width="1" size="500"></hr>
                    <div className="children">
                        {children}
                    </div>
                </div>
            )
        } else if (this.state.userType == 'recipient') {
            return (
                <div id="app-wrapper">
                    <div id="nav-bar">
                        <Logo />
                        <div id="nav-links">
                            <Link to="/">Home</Link><br />
                            <Link to="/resources/">Resources</Link><br />
                            <Link to="/profile/">Profile</Link><br />
                            <Link onClick={this.handleLogout}>Logout</Link><br />
                        </div>
                    </div>
                    <hr width="1" size="500"></hr>
                    <div className="children">
                        {children}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}
