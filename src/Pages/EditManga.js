import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchUserUploadedManga } from './../actions/index';

class EditManga extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "",
        }
    }

    componentWillMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (!username || !password) {
            alert("Please log in");
            window.location.replace("/")
        }
        else {
            console.log(username);
            this.props.getUserUploadedManga(username);
        }
    }

    onDelete = (e) => {
        e.preventDefault();
        let Confirm = confirm("Are you really wan't to delete this?");
        if (Confirm) {
            let username = localStorage.getItem("username");
            let password = localStorage.getItem("password");
            let user = {
                username,
                password
            }
            let mangaID = e.target.value;
            let endPoint = "/remove/manga/" + mangaID;
            apiCaller("POST", endPoint, user, (data, err) => {
                if (err) throw err;
                this.setState({
                    msg: "Manga deleted",
                    mangas: data.data
                })
            })
        }
    }

    render() {
        let { msg } = this.state;
        let mangas = this.props.mangaUploadedByUser;
        let alert = "alert";
        let result = [];
        for (let i = 0; i < mangas.length; i++) {
            result.push(
                <tr key={i}>
                    <th>{mangas[i]._id}</th>
                    <td><Link to={"/detail/" + mangas[i]._id} exact="true"> {mangas[i].name} </Link></td>
                    <td>
                        <Link to={"/add/chapter/" + mangas[i]._id} exact="true">
                            <button type="button" class="btn mr-sm-2 btn-info">
                                New Chapter
                                </button>
                        </Link>
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

const mapStateToProps = state => {
    return {
        mangaUploadedByUser: state.Manga
    }
}

const mapDispatchToProps = (dispacth, props) => {
    return {
        getUserUploadedManga: username => {
            dispacth(actFetchUserUploadedManga(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditManga);