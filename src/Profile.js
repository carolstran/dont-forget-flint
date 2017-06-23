import React from 'react';
import axios from './axios';
import {DonorLocation} from './DonorLocation';
import {FamilyStory} from './FamilyStory';
import {EditInfo} from './EditInfo';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePicUpload = this.handlePicUpload.bind(this);
        this.handlePicInfo = this.handlePicInfo.bind(this);
        this.toggleEditInfo = this.toggleEditInfo.bind(this);
    }
    handlePicUpload(e) {
    let file = this.state.file;
    var formData = new FormData();
    formData.append('file', file);

    if (this.props.userType == 'donor') {
        axios.post('/uploadDonorFile', formData)
        .then((res) => {
            if (res.data.imageUrl) {
                return this.props.setImage(res.data.imageUrl);
            }
        });
    } else {
        axios.post('/uploadFamilyFile', formData)
        .then((res) => {
            if (res.data.imageUrl) {
                return this.props.setImage(res.data.imageUrl);
            }
        });
    }
    }
    handlePicInfo(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    toggleEditInfo() {
        this.setState({
            showEditInfo: !this.state.showEditInfo
        });
    }
    render() {
        if (this.props.userType == 'donor') {
            return (
                <div id="profile-page">
                    <h1 className="inapp-h1">Your Donor Profile</h1><br />
                    <br />
                    <div className="profile-image">
                        <img src={this.props.imageUrl || "/public/assets/blank-avatar.jpg"} />
                    </div>
                    <div className="profile-text">
                        <h2>Share a Photo</h2>
                        <input type="file" className="file-input" onChange={this.handlePicInfo} /><br />
                        <br />
                        <button className="button" type="submit" onClick={this.handlePicUpload}>&gt; UPLOAD</button><br />
                        <br />
                        <h2>Where are you from?</h2>
                        <div className="profile-location">
                            {this.state.showEditInfo ? <EditInfo toggleEditInfo={this.toggleEditInfo} updateLocation={this.props.updateLocation} userType={this.props.userType} /> : <DonorLocation location={this.props.location} toggleEditInfo={this.toggleEditInfo} userType={this.props.userType} />}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div id="profile-page">
                    <h1 className="inapp-h1">Your Family Profile</h1><br />
                    <div className="profile-image">
                        <img src={this.props.imageUrl || "/public/assets/blank-avatar.jpg"} />
                    </div>
                    <div className="profile-text">
                        <h2>Share a Photo</h2>
                        <input type="file" className="file-input" onChange={this.handlePicInfo} /><br />
                        <br />
                        <button className="button" type="submit" onClick={this.handlePicUpload}>&gt; UPLOAD</button><br />
                    </div>
                    <br />
                    <br />
                    <h2>Tell Your Story</h2>
                    <div className="profile-story">
                        {this.state.showEditInfo ? <EditInfo toggleEditInfo={this.toggleEditInfo} updateStory={this.props.updateStory} userType={this.props.userType} /> : <FamilyStory story={this.props.story} toggleEditInfo={this.toggleEditInfo} userType={this.props.userType} />}
                    </div>
                </div>
            )
        }
    }
}
