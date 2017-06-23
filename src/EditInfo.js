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
        if (this.props.userType == 'donor') {
            axios.post('/updateDonorLocation', { location: this.state.info })
            .then((res) => {
                if (res.data.success) {
                    this.props.updateLocation(res.data);
                    this.props.toggleEditInfo();
                }
            });
        } else if (this.props.userType == 'recipient') {
            axios.post('/updateFamilyStory', { story: this.state.info })
            .then((res) => {
                if (res.data.success) {
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
                <textarea id="info-input" type="text" name="info" maxlength="250" onChange={this.handleEditInfo}></textarea><br /><br />
                <button className="button" type="submit" onClick={this.handleSaveInfo}>&gt; Save</button>
                <button className="button" onClick={this.closeEditInfo}>&gt; Nevermind</button>
            </div>
        )
    }
}
