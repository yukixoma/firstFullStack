import React, { Component } from 'react';
import EditChapterPreview from '../components/EditChapterPreview';
import apiCaller from './../apiCaller';
import AddImage from '../components/AddImage';
import BloggerGetLink from '../components/BloggerGetLink';

class EditChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterIndex: 0,
            mode: "addImage",
            manga: {},
            id: "",
            preViewUrl: [],
            bloggerUrl: [],
            imgIndex: 0,
            singlePreviewUrl: "",
        }
    }

    componentWillMount() {
        let { mangas, match } = this.props;
        let { id } = match.params;
        let manga = mangas.filter(e => {
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

    onReceiveImgLink = (url, position) => {
        if (position === null) this.setState({
            preViewUrl: url,
            imgIndex: position
        });
        else this.setState({
            singlePreviewUrl: url,
            imgIndex: position
        })
    }

    onChangeMode = e => {
        let { value } = e.target;
        this.setState({
            mode: value,
            bloggerUrl: [],
            preViewUrl: [],
            singlePreviewUrl: "",
        })
    }

    onReceiveBloggerUrl = href => {
        this.setState({ bloggerUrl: href });
    }

    render() {
        let { manga, chapterIndex, preViewUrl, singlePreviewUrl, imgIndex, id, mode, bloggerUrl } = this.state;
        let chapter = manga.chapter[chapterIndex];
        let result = manga.chapter.map((chap, index) => {
            return (
                <option key={index} value={index}>
                    Chapter {index + 1}
                </option>
            )
        })
        let editMode = () => {
            switch (mode) {
                case "addImage":
                    return (<AddImage
                        id={id}
                        chapterIndex={chapterIndex}
                        onReceiveImgLink={this.onReceiveImgLink}
                    />)
                case "bloggerImport":
                    return (<BloggerGetLink
                        id={id}
                        chapterIndex={chapterIndex}
                        onReceivepreViewUrl={this.onReceiveBloggerUrl}
                    />)
                default:
                    return (<AddImage
                        id={id}
                        chapterIndex={chapterIndex}
                        onReceiveImgLink={this.onReceiveImgLink}
                    />);
            }
        }
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
                                        <select className="form-control" value={mode} name="selectMode" onChange={this.onChangeMode}>
                                            <option value="addImage"> Add image </option>
                                            <option value="reArrange"> Re-arrange </option>
                                            <option value="reUp"> Re-up </option>
                                            <option value="bloggerImport"> Blogger Import </option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <br />
                            {editMode()}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <EditChapterPreview
                            chapter={chapter}
                            preViewUrl={preViewUrl}
                            singlePreviewUrl={singlePreviewUrl}
                            imgIndex={imgIndex}
                            bloggerUrl={bloggerUrl}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default EditChapter;