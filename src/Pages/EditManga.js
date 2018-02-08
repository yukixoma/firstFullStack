import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import paginate from '../paginate';

class EditManga extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            itemPerPage: 5,
            msg: "",
            mangas: []
        }
    }

    componentWillMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (username && password) {
            let allManga = localStorage.getItem("allManga");
            allManga = JSON.parse(allManga);
            let mangas = allManga.filter(e => {
                return e.username === username;
            });
            this.setState({ mangas })
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
        let { page, itemPerPage, mangas } = this.state;
        let { value } = e.target;

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
        let { msg, page, itemPerPage, mangas } = this.state;
        let paginated = paginate(mangas, itemPerPage, page, 1);
        let alert = "alert";
        let result = [];
        for (let i = 0; i < paginated.length; i++) {
            result.push(
                <tr key={i}>
                    <td style={{ width: 550 }}><Link to={"/detail/" + paginated[i]._id} exact="true"> {paginated[i].name} </Link></td>
                    <td>
                        <Link to={"/add/chapter/" + paginated[i]._id} exact="true">
                            <button type="button" class="btn mr-sm-2 btn-success">
                                New Chapter
                            </button>
                        </Link>
                        <Link to={"/edit/chapter/" + paginated[i]._id} exact="true">
                            <button type="button" class="btn mr-sm-2 btn-info">
                                Edit Chapter
                            </button>
                        </Link>
                        <Link to={"/edit/manga/" + paginated[i]._id}>
                            <button type="button" class="btn mr-sm-2 btn-warning">
                                Edit Manga
                            </button>
                        </Link>
                        <button type="button" class="btn mr-sm-2 btn-danger" value={paginated[i]._id} onClick={this.onDelete}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        }

        return (
            <div className="container" style={{marginTop: 50}}>
                <div className="card">
                    <h3 className="card-header text-center"> List of Mangas uploaded by you </h3>
                    <div className="card-block">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: 550 }}>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result}
                            </tbody>
                        </table>
                        <div className="row justify-content-center">
                            <button type="button" value="-" className="btn btn-danger mr-sm-2" onClick={this.onPaginate}>
                                Prev
                            </button>
                            <input className="form-control text-center paginate-input mr-sm-2" value={page} onChange={this.onChange} />
                            <button type="button" value="+" className="btn btn-success " onClick={this.onPaginate}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditManga;