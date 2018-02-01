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
        previewUrl[imgPosition] = (URL.createObjectURL(e.target.files[0]));
        this.props.onReceivepreViewUrl(previewUrl);
    }

    render() {
        let result = [];
        let { id } = this.props;
        let endPoint = "/chap/new/" + id;
        for (let i = 0; i < this.state.uploadNumber; i++) {
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
            <div className="card ">
                <h3 class="card-header">Uploader</h3>
                <div className="card-block" >
                    <form action={endPoint} method="post" enctype="multipart/form-data" className="row">
                        <div className="col-lg-8">
                            {result}
                        </div>
                        <div className="col-lg-4 text-right">
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