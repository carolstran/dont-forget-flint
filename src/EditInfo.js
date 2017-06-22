import React from 'react';
import axios from './axios';
import {App} from './App';
import {Profile} from './Profile';

export class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSaveInfo = this.handleSaveInfo.bind(this);
        this.handleEditInfo = this.handleEditInfo.bind(this);
        this.closeEditInfo = this.closeEditInfo.bind(this);
    }
    handleSaveInfo(e) {
        console.log(this.props.userType);
        if (this.props.userType == 'donor') {
            console.log('Here is info', this.state.info);
            axios.post('/updateDonorLocation', { location: this.state.info })
            .then((res) => {
                console.log('Axios ran for donor');
                if (res.data.success) {
                    console.log('Successful data', res.data);
                    this.props.updateLocation(res.data);
                    this.props.toggleEditInfo();
                }
            });
        } else if (this.props.userType == 'recipient') {
            console.log('Here is info', this.state.info);
            axios.post('/updateFamilyStory', { story: this.state.info })
            .then((res) => {
                if (res.data.success) {
                    console.log('Successful data', res.data);
                    this.props.updateStory(res.data);
                    this.props.toggleEditInfo();
                }
            });
        }
    }
    handleEditInfo(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    closeEditInfo(e) {
        this.props.toggleEditInfo();
    }
    render() {
        return (
            <div id="edit-info-wrapper">
                <textarea id="info-input" type="text" name="info" maxlength="250" onChange={this.handleEditInfo}></textarea><br />
                <button className="button" type="submit" onClick={this.handleSaveInfo}>Save</button>
                <button className="button" onClick={this.closeEditInfo}>Nevermind</button>
            </div>
        )
    }
}
