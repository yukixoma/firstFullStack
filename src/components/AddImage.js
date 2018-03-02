import React, { Component } from 'react';

class AddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preViewUrl: [],
            singlePreviewUrl: "",
            imgIndex: 0
        }
    }

    onChangePosition = e => {
        e.preventDefault();
        let { imgIndex, singlePreviewUrl } = this.state;
        let { value } = e.target;
        if (value === "+") imgIndex += 1;
        else imgIndex -= 1;
        if (imgIndex < 0) imgIndex = 0;
        this.setState({
            imgIndex
        })
        this.props.onReceiveImgLink(singlePreviewUrl, imgIndex);
    }

    onChangeImg = e => {
        let { imgIndex } = this.state;
        let files = e.target.files[0];
        let singlePreviewUrl = files ? URL.createObjectURL(files) : "";
        this.setState({
            singlePreviewUrl
        })
        this.props.onReceiveImgLink(singlePreviewUrl, imgIndex);
    }

    onChangeAddImage = e => {
        let preViewUrl = [];
        let { files } = e.target;
        let length = files.length;
        for (let i = 0; i < length; i++) {
            preViewUrl.push(URL.createObjectURL(files[i]))
        }
        this.setState({ preViewUrl });
        this.props.onReceiveImgLink(preViewUrl, null);
    }

    onAddImage = e => {
        e.preventDefault();
        console.log("click");
        let { id, chapterIndex } = this.state;
        let form = document.getElementById("form");
        let formData = new FormData(form);
        let endPoint = "/chapter/add/" + id + "/" + chapterIndex;
        apiCaller("POST", endPoint, formData, (res, err) => {
            if (err) throw err;
            console.log(res.data);
        })
    }


    onAddImageToPosition = e => {
        e.preventDefault();
        let { id, chapterIndex } = this.props;
        let form = document.getElementById("form-1");
        let formData = new FormData(form);
        let endPoint = "/chapter/add/" + id + "/" + chapterIndex;
        apiCaller("POST", endPoint, formData, (res, err) => {
            if (err) throw err;
            console.log(res.data);
        })
    }


    render() {
        let { imgIndex } = this.state;
        return (
            <div className="card">
            <h3 class="card-header" style={{ backgroundColor: "#ffbb33", color: "white" }}> Add Image </h3>
                <div className="card-block">
                    <label> <strong> Add to bottom </strong> </label>
                    <form id="form" className="form-inline" encType="multipart/form-data"
                        onChange={this.onChangeAddImage}
                        onSubmit={this.onAddImage}
                    >
                        <input className="form-control-file" type="file" name="files" multiple required />
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                    <br />
                    <label> <strong> Add to specific position {imgIndex} </strong> </label>
                    <form id="form-1" className="form-inline" encType="multipart/form-data"
                        onChange={this.onChangeImg}
                        onSubmit={this.onAddImageToPosition}
                    >
                        <input value={imgIndex} name="imgIndex" style={{ display: "none" }} />
                        <input className="form-control-file" type="file" name="files" required />
                        <button type="button" value="-" class="btn btn-danger mr-sm-2" onClick={this.onChangePosition}> - </button>
                        <button type="button" value="+" class="btn btn-success mr-sm-2" onClick={this.onChangePosition}> + </button>
                        <button type="submit" class="btn btn-primary mr-sm-2">Upload</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddImage;