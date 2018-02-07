import React, { Component } from 'react';
import apiCaller from './../apiCaller';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadNumber: 8,
        }
    }
    onClickHandle = (e) => {
        e.preventDefault();
        let { value } = e.target;
        let { uploadNumber } = this.state;
        uploadNumber = value === "+" ? uploadNumber + 1 : uploadNumber - 1;
        if (uploadNumber === 0) uploadNumber = 1;
        this.setState({
            uploadNumber
        })
    }

    onChangeHandle = (e) => {
        let { previewUrl } = this.props;
        let imgPosition = e.target.id;
        let isLink = e.target.files[0] ? true : false;
        previewUrl[imgPosition] = isLink? URL.createObjectURL(e.target.files[0]) : "";
        this.props.onReceivepreViewUrl(previewUrl);
    }

    onUpload = (e) => {
        e.preventDefault();
        this.props.onReceiveUploadMsg("Uploading to server");
        let formElement = document.getElementById("form");
        let formData = new FormData(formElement);
        let { id } = this.props;
        let endPoint = "/chap/new/" + id;
        apiCaller("POST", endPoint, formData, (data, err) => {
            if (err) this.props.onReceiveUploadMsg(err);
            if (data) this.props.onReceiveUploadMsg(data.data);
        })
    }

    onSetUploadNumber = e => {
        let uploadNumber = e.target.value;
        if (uploadNumber !== "") {
            uploadNumber = parseInt(uploadNumber, 10);
            this.setState({
                uploadNumber
            })
        } else {
            this.setState({
                uploadNumber
            })
        }
    }
    onBlur = e => {
        let uploadNumber = e.target.value;
        console.log(uploadNumber);
        if (uploadNumber === "") {
            this.setState({
                uploadNumber: 8
            })
        }
    }

    render() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let result = [];
        let { uploadNumber } = this.state;
        for (let i = 0; i < uploadNumber; i++) {
            result.push(
                <div className="form-group" key={i}>
                    <label> File {i + 1} </label>
                    <input type="file" id={i} className="form-control-file" name="files" accept="image/*" required
                        onChange={this.onChangeHandle}
                    />
                </div>
            )
        }
        return (
            <div className="card">
                <h3 class="card-header" style={{ backgroundColor: "#428bca", color: "white" }}>Single Uploader</h3>
                <div className="card-block" >
                    <form className="row" id="form" encType="multipart/formdata" onSubmit={this.onUpload}>
                        <div style={{ display: "none" }}>
                            <input name="username" value={username} />
                            <input name="password" value={password} />
                        </div>
                        <div className="col-lg-8">
                            {result}
                        </div>
                        <div className="col-lg-4 text-right">
                            <label> Number of pages </label>
                            <input
                                className="form-control add-chapter-button"
                                value={uploadNumber}
                                onChange={this.onSetUploadNumber}
                                onBlur={this.onBlur}
                            />
                            <button type="button" value="+" className="btn btn-success add-chapter-button my-sm-2" onClick={this.onClickHandle}>
                                + upload field
                                </button>
                            <button type="button" value="-" className="btn btn-danger add-chapter-button my-sm-2" onClick={this.onClickHandle}>
                                - upload field
                                </button>
                            <button type="submit" className="btn btn-primary add-chapter-button my-sm-2">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Uploader;