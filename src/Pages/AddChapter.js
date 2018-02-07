import React, { Component } from 'react';
import Uploader from '../components/Uploader';
import NewChapterPreview from '../components/NewChapterPreview';
import MultifileUploader from '../components/MultifileUploader';

class AddChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewUrl: [],
            alert: "alert alert-info",
            msg: "Upload image one by one to guarantee their order",
            isMulti: "false"
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

    onUploaderChange = e => {
        let { value } = e.target;
        let msg, alert = "";
        if (value === "true") {
            msg = "Be carefull! In this upload mode, images's name must be in A-Z order";
            alert = "alert alert-warning";
        } else {
            alert = "alert alert-info";
            msg = "Upload image one by one to guarantee their order";
        }
        this.setState({
            alert,
            msg,
            isMulti: value
        })
    }

    render() {
        let { mangas, match } = this.props;
        let { id } = match.params;
        let manga = mangas.filter(e => {
            return e._id === id;
        })
        let { previewUrl, alert, msg, isMulti } = this.state;
        let uploader = isMulti === "true" ?
            (<MultifileUploader
                onReceivepreViewUrl={this.previewUrlReceiver}
                onReceiveUploadMsg={this.uploadMsg}
                previewUrl={previewUrl}
                id={id}
            />)
            :
            (<Uploader
                onReceivepreViewUrl={this.previewUrlReceiver}
                onReceiveUploadMsg={this.uploadMsg}
                previewUrl={previewUrl}
                id={id}
            />)

        return (
            <div className="container">
                <div className={alert} role="alert" style={{ marginTop: 10 }}>
                    <h5 className="text-center"> {msg} </h5>
                </div>
                <div className="alert alert-success" role="alert">
                    New chapter of: &nbsp;
                    <a href={"/detail/" + manga[0]._id} target="_blank">
                        {manga[0].name}
                    </a>
                    <br />
                    <a href={"/read/" + manga[0]._id + "/" + (manga[0].chapter.length - 1)} target="_blank">
                        Lastest chapter:
                    </a>
                    &nbsp; <strong> {manga[0].chapter.length} </strong>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card" style={{marginBottom: 10, padding: 5}}>
                            <div className="form-inline">
                                <label> Select upload mode  &nbsp; </label>
                                <select className="form-control" value={isMulti} onChange={this.onUploaderChange}>
                                    <option value="false"> Single File Uploader </option>
                                    <option value="true"> Multifile Uploader </option>
                                </select>
                            </div>
                        </div>
                        {uploader}
                    </div>
                    <div className="col-lg-6">
                        <NewChapterPreview previewUrl={previewUrl} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddChapter;