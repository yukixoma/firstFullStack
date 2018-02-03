import React, { Component } from 'react';
import Uploader from '../components/Uploader';
import Preview from '../components/Preview';
import { Redirect } from 'react-router';

class AddChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewUrl: [],
            alert: "alert alert-info",
            msg: "Upload image one by one to guarantee their order",
        }
    }

    previewUrlReceiver = previewUrl => {
        this.setState({
            previewUrl
        })
    }

    uploadMsg = msg => {
        let { id } = this.props.match.params;
        if (msg === "Uploading to server") {
            this.setState({
                alert: "alert alert-warning",
                msg: "Files is being uploaded to server don't exit now!"
            })
        }
        else if (msg === "Server recieved files") {
            this.setState({
                alert: "alert alert-success",
                msg: "Server recieved files and will continue uploading to image Host. " +
                    "Your new chapter will be added after server upload is done. " +
                    "It can take about 3 - 5 minutes. " +
                    "Auto redirect in 15 second."
            }, () => {
                setTimeout(
                    () => { window.location.replace("/detail/" + id) },
                    15000)
            })
        }
        else {
            this.setState({
                alert: "alert alert-danger",
                msg
            })
        }
    }

    render() {
        let { id } = this.props.match.params;
        let { previewUrl, alert, msg, uploadIsDone } = this.state;
        return (
            <div className="container">
                <div className={alert} role="alert" style={{ marginTop: 10 }}>
                    <h5 className="text-center"> {msg} </h5>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <Uploader
                            onReceivepreViewUrl={this.previewUrlReceiver}
                            onReceiveUploadMsg={this.uploadMsg}
                            previewUrl={previewUrl}
                            id={id}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Preview previewUrl={previewUrl} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddChapter;