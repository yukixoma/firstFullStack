import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import apiCaller from '../apiCaller';

class EditManga extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "",
            mangas: []
        }
    }

    componentDidMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let user = {
            username,
            password
        }
        if (username) {
            apiCaller("POST", "/fetchUserUploadedManga", user, (data, err) => {
                if (data.data !== "Authentication error") this.setState({ mangas: data.data });
                else alert("Authentication error, re-login please");
            })
        }
        else {
            alert("Please log in");
            window.location.replace("/");
        };
    }

    onDelete = (e) => {
        e.preventDefault();
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let user = {
            username,
            password
        }
        let mangaID = e.target.value;
        let endPoint = "/remove/manga/" + mangaID;
        apiCaller("POST", endPoint, user , (data, err) => {
            if (err) throw err;
            this.setState({
                msg: "Manga deleted",
                mangas: data.data
            })
        })

    }

    render() {
        let { mangas, msg } = this.state;
        let alert = "alert";
        let result = [];
        for (let i = 0; i < mangas.length; i++) {
            result.push(
                <tr key={i}>
                    <th>{mangas[i]._id}</th>
                    <td><Link to={"/detail/" + mangas[i]._id} exact="true"> {mangas[i].name} </Link></td>
                    <td>
                        <button type="button" class="btn mr-sm-2 btn-info">New Chapter</button>
                        <button type="button" class="btn mr-sm-2 btn-warning">Edit</button>
                        <button type="button" class="btn mr-sm-2 btn-danger" value={mangas[i]._id} onClick={this.onDelete}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        }
        return (
            <div className="container">
                <div className="card">
                    <div className={alert} role="alert">
                        {msg}
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EditManga;