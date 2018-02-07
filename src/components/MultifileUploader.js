import React, { Component } from 'react';
import apiCaller from '../apiCaller';

class MultifileUploader extends Component {
    onChangeHandle = e => {
        let { files } = e.target;
        let isLink = files.length === 0 ? false : true;
        let { previewUrl } = this.props;
        if (isLink) {
            for (let i = 0; i < files.length; i++) {
                previewUrl.push(URL.createObjectURL(files[i]))
            }
        }
        this.props.onReceivepreViewUrl(previewUrl);
    }

    onUpload = e => {
        e.preventDefault();
        this.props.onReceiveUploadMsg("Uploading to server");
        let form = document.getElementById("form");
        let formData = new FormData(form);
        let { id } = this.props;
        let endPoint = "/chap/new/" + id;
        apiCaller("POST", endPoint, formData, (data, err) => {
            if (err) this.props.onReceiveUploadMsg(err);
            if (data) this.props.onReceiveUploadMsg(data.data);
        })
    }

    render() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        return (
            <div className="card">
                <h3 class="card-header" style={{ backgroundColor: "#428bca", color: "white" }}>Multiple Uploader</h3>
                <div className="card-block" >
                    <form className="form-inline" id="form" encType="multipart/formdata" onSubmit={this.onUpload}>
                        <div style={{ display: "none" }}>
                            <input name="username" value={username} />
                            <input name="password" value={password} />
                        </div>
                        <label> Files &nbsp; </label>
                        <input type="file" className="form-control-file"
                            name="files" accept="image/*" multiple required
                            onChange={this.onChangeHandle}
                        />
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default MultifileUploader;