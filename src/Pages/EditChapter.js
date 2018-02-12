import React, { Component } from 'react';
import EditChapterPreview from '../components/EditChapterPreview';
import apiCaller from './../apiCaller';

class EditChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterIndex: 0,
            function: "",
            manga: {},
            id: "",
            preViewUrl: [],
            imgIndex: 0,
            singlePreviewUrl: "",
        }
    }

    componentWillMount() {
        let allManga = localStorage.getItem("allManga");
        let id = this.props.match.params.id;
        allManga = JSON.parse(allManga);
        let manga = allManga.filter(e => {
            return e._id === id;
        })
        this.setState({
            manga: manga[0],
            id
        })
    }

    onChange = e => {
        let { name, value } = e.target;
        if (name === "selectChapter") {
            value = parseInt(value, 10);
            this.setState({ chapterIndex: value })
        }
    }

    onChangeAddImage = e => {
        let preViewUrl = [];
        let { files } = e.target;
        let length = files.length;
        for (let i = 0; i < length; i++) {
            preViewUrl.push(URL.createObjectURL(files[i]))
        }
        this.setState({ preViewUrl });
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

    onClick = e => {
        e.preventDefault();
        let { imgIndex } = this.state;
        let { value } = e.target;
        if (value === "+") imgIndex += 1;
        else imgIndex -= 1;
        if (imgIndex < 0) imgIndex = 0;
        this.setState({
            imgIndex
        })
    }

    onChangeImg = e => {
        let files = e.target.files[0];
        let singlePreviewUrl = files ? URL.createObjectURL(files) : "";
        this.setState({
            singlePreviewUrl
        })
    }

    onAddImageToPosition = e => {
        e.preventDefault();
        let { id, chapterIndex } = this.state;
        let form = document.getElementById("form-1");
        let formData = new FormData(form);
        let endPoint = "/chapter/add/" + id + "/" + chapterIndex;
        apiCaller("POST", endPoint, formData, (res, err) => {
            if (err) throw err;
            console.log(res.data);
        })
    }

    render() {
        let { manga, chapterIndex, preViewUrl, singlePreviewUrl, imgIndex } = this.state;
        let chapter = manga.chapter[chapterIndex];
        let result = manga.chapter.map((chap, index) => {
            return (
                <option key={index} value={index}>
                    Chapter {index + 1}
                </option>
            )
        })
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className=" fix-position">
                            <div className="card">
                                <h3 className="card-header" style={{ backgroundColor: "#428bca", color: "white" }}>Editor</h3>
                                <div className="card-block">
                                    <form className="form-inline" onChange={this.onChange}>
                                        <label> Select Chapter &nbsp; </label>
                                        <select className="form-control mr-sm-2" value={chapterIndex} name="selectChapter">
                                            {result}
                                        </select>
                                        <label> Select Mode &nbsp; </label>
                                        <select className="form-control" name="selectFunction">
                                            <option> Add image </option>
                                            <option> Re-arrange </option>
                                            <option> Re-up </option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-block">
                                    <label> Add to bottom </label>
                                    <form id="form" className="form-inline" encType="multipart/form-data"
                                        onChange={this.onChangeAddImage}
                                        onSubmit={this.onAddImage}
                                    >
                                        <input className="form-control-file" type="file" name="files" multiple required />
                                        <button type="submit" class="btn btn-primary">Upload</button>
                                    </form>
                                    <br />
                                    <label> Add to specific position {imgIndex} </label>
                                    <form id="form-1" className="form-inline" encType="multipart/form-data"
                                        onChange={this.onChangeImg}
                                        onSubmit={this.onAddImageToPosition}
                                    >
                                        <input value={imgIndex} name="imgIndex" style={{ display: "none" }} />
                                        <input className="form-control-file" type="file" name="files" required />
                                        <button type="button" value="-" class="btn btn-danger" onClick={this.onClick}> - </button>
                                        <button type="button" value="+" class="btn btn-success" onClick={this.onClick}> + </button>
                                        <button type="submit" class="btn btn-primary">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <EditChapterPreview
                            chapter={chapter}
                            preViewUrl={preViewUrl}
                            singlePreviewUrl={singlePreviewUrl}
                            imgIndex={imgIndex}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default EditChapter;