import React, { Component } from 'react';
import apiCaller from '../apiCaller';

class BloggerGetLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: "",
            postID: "",
            blogID: "",
            href: []
        }
    }

    onGetlink = e => {
        e.preventDefault();
        let { apiKey, postID, blogID } = this.state;
        let url = "https://www.googleapis.com/blogger/v3/blogs/"
            + blogID + "/posts/" + postID + "?key=" + apiKey;
        apiCaller("GET", url, null, (res, err) => {
            if (err) console.log(err);
            if (res) {
                let { content } = res.data;
                let demo = document.getElementById("demo");
                demo.innerHTML = content;
                let a = demo.getElementsByTagName("a");
                let length = a.length;
                let href = [];
                for (let i = 0; i < length; i++) {
                    href.push(a[i].href);
                }
                this.props.onReceivepreViewUrl(href);
                this.setState({ href });
            }
        })
    }

    onUpload = e => {
        e.preventDefault();
        let { id, chapterIndex } = this.props;
        let { href } = this.state;
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (chapterIndex !== undefined) {
            let data = { username, password, href };
            let endPoint = "/chapter/add/" + id + "/" + chapterIndex;
            apiCaller("POST", endPoint, data, (res, err) => {
                if (err) throw err;
                console.log(res.data);
            })
        } else {
            let data = { username, password, href };
            let endPoint = "/chap/new/" + id;
            apiCaller("POST", endPoint, data, (res, err) => {
                if (err) this.props.onReceiveUploadMsg(err);
                if (res) this.props.onReceiveUploadMsg(res.data);
            })
        }
    }

    onChange = e => {
        let { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="card">
                <h3 class="card-header" style={{ backgroundColor: "#428bca", color: "white" }}> Blogger Importer </h3>
                <div className="card-block" >
                    <form id="form" encType="multipart/formdata" onSubmit={this.onGetlink} onChange={this.onChange}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label> Blogger api key: </label>
                            </div>
                            <div className="col-lg-6">
                                <input classname="form-control" name="apiKey" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label> Blog ID: </label>
                            </div>
                            <div className="col-lg-6">
                                <input classname="form-control" name="blogID" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label> Post ID: </label>
                            </div>
                            <div className="col-lg-6">
                                <input classname="form-control" name="postID" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: 5 }}>
                            <div className="col-lg-4"> </div>
                            <div>
                                <button type="submit" className="btn btn-primary mr-sm-2">Get link</button>
                                <button type="button" className="btn btn-success" onClick={this.onUpload}>Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="demo" style={{ display: "none" }}></div>
            </div>
        )
    }
}

export default BloggerGetLink;