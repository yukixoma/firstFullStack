import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchUserUploadedManga } from './../actions/index';

class EditManga extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            itemPerPage: 5,
            msg: "",
        }
    }

    componentWillMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (username && password) {
            this.props.getUserUploadedManga(username);
        }
        else {
            alert("Please log in");
            window.location.replace("/")
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

    onPaginate = e => {
        e.preventDefault();
        let { page, itemPerPage } = this.state;
        let { value } = e.target;
        let mangas = this.props.mangaUploadedByUser;
        if (value === "+" && (page - 1) * itemPerPage < mangas.length - 1) {
            this.setState({
                page: page + 1
            }, () => {
                window.scroll(0, 0);
            })
        }
        if (value === "-" && page > 1) {
            this.setState({
                page: page - 1
            }, () => {
                window.scroll(0, 0);
            })
        }
    }

    render() {
        let { msg, page, itemPerPage } = this.state;
        let mangas = this.props.mangaUploadedByUser;
        let paginated = [];
        for (let i = (page - 1) * itemPerPage; i < mangas.length && i < (page * itemPerPage); i++) {
            paginated.push(mangas[i]);
        }
        let alert = "alert";
        let result = [];
        for (let i = 0; i < paginated.length; i++) {
            result.push(
                <tr key={i}>
                    <th>{paginated[i]._id}</th>
                    <td><Link to={"/detail/" + paginated[i]._id} exact="true"> {paginated[i].name} </Link></td>
                    <td>
                        <Link to={"/add/chapter/" + paginated[i]._id} exact="true">
                            <button type="button" class="btn mr-sm-2 btn-info">
                                New Chapter
                                </button>
                        </Link>
                        <button type="button" class="btn mr-sm-2 btn-warning">Edit</button>
                        <button type="button" class="btn mr-sm-2 btn-danger" value={paginated[i]._id} onClick={this.onDelete}>
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
                    <div className="row">
                        <div className="col-lg-4"> </div>
                        <div className="col-lg-4">
                            <form className="form-inline">
                            <button type="button" value="-" className="btn btn-danger mr-sm-2" onClick={this.onPaginate}>
                                Prev
                            </button>
                            <input className="form-control text-center paginate-input mr-sm-2" value={page} onChange={this.onChange} />
                            <button type="button" value="+" className="btn btn-success " onClick={this.onPaginate}>
                                Next
                            </button>
                            </form>
                        </div>
                    </div>
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