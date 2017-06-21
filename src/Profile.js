import React from 'react';
import axios from './axios';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePicUpload = this.handlePicUpload.bind(this);
        this.handlePicInfo = this.handlePicInfo.bind(this);
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
    render() {
        if (this.props.userType == 'donor') {
            return (
                <div id="profile-page">
                    <h1>DONOR TESTING</h1>
                    <h2>We'd love to know more about you to tell the family that receives your donation.</h2>

                    <p>Upload an image of yourself</p><br />
                    <img src={this.props.imageUrl || "/public/assets/blank-avatar.jpg"} /><br />
                    <input type="file" className="button" onChange={this.handlePicInfo} /><br />
                    <button className="button" type="submit" onClick={this.handlePicUpload}>UPLOAD</button><br />
                    <br />
                    <p>Where are you from?</p>
                </div>
            )
        } else {
            return (
                <div id="profile-page">
                <h1>FAMILY TESTING</h1>
                <p>Upload an image of yourself</p><br />
                <img src={this.props.imageUrl || "/public/assets/blank-avatar.jpg"} /><br />
                <input type="file" className="button" onChange={this.handlePicInfo} /><br />
                <button className="button" type="submit" onClick={this.handlePicUpload}>UPLOAD</button><br />
                <br />
                </div>
            )
        }
    }
}
