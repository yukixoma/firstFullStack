import React, { Component } from 'react';
import Uploader from '../components/Uploader';
import Preview from '../components/Preview';

class AddChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewUrl: [],
            alert: "alert alert-warning",
            msg: "Upload image one by one to guarantee their order"
        }
    }

    previewUrlReceiver = previewUrl => {
        this.setState({
            previewUrl
        })
    }

    uploadMsg = msg => {
        if (msg === "Server recieved files") {
            this.setState({
                alert: "alert alert-success",
                msg: "Server recieved files and continue uploading to image Host. \n" +
                    "Your new chapter will be added after server upload is done."
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
        let { previewUrl, alert, msg } = this.state;

        return (
            <div className="container">
                <div className={alert} role="alert" style={{marginTop: 10}}>
                    {msg}
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