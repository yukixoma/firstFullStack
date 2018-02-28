import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiCaller from '../apiCaller';

class MangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBookmarked: false,
            isLogin: false
        }
    }

    componentWillMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (username && password) {
            let { id } = this.props;
            let isBookmarked = false;
            let bookmarkList = localStorage.getItem("bookmarkList");
            bookmarkList = JSON.parse(bookmarkList);

            bookmarkList.forEach(e => {
                if (e.id === id) isBookmarked = true;
            })

            this.setState({
                isBookmarked,
                isLogin: true
            })
        }
    }

    onBookmark = e => {
        e.preventDefault();
        let { isBookmarked, isLogin } = this.state;
        isBookmarked = !isBookmarked;

        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");

        let { id, manga } = this.props;

        this.setState({
            isBookmarked
        })

        let data = {
            id,
            username,
            password,
            isBookmarked,
            updatedAt: manga.updatedAt
        }

        apiCaller("POST", "/bookmark", data, (res, err) => {
            if (err) alert(err);
            if (res) {
                localStorage.setItem("bookmarkList", JSON.stringify(res.data));
            };
        })
    }

    render() {
        let location = window.location.href;
        let { manga, id } = this.props;
        let { isBookmarked, isLogin } = this.state;
        let result = [];
        let genres = [];
        if (manga.chapter) {
            for (let i = 0; i < manga.chapter.length; i++) {
                result.push(
                    <li key={i} className="list-group-item">
                        <Link to={"/read/" + id + "/" + i} exact="true">
                            Chapter {i + 1}
                        </Link>
                    </li>
                )
            }
            genres = manga.genre.map((genre, index) => {
                return (
                    <Link className="badge badge-pill badge-info" key={index} to={"/list/genre/" + genre} exact="true" >
                        {genre}
                    </Link>
                )
            })
        }

        return (
            <div className="card manga-info">
                <div className="card manga-info-item">
                    <h1 className="card-header text-center"> {manga.name} </h1>
                    <img src={manga.cover} class="img-fluid rounded manga-info-item" alt="Responsive image" />
                </div>
                <div className="card manga-info-item">
                    <h3 className="card-header text-center">Description</h3>
                    <div className="card-block">
                        <p className="card-text text-justify">
                            {manga.description}
                        </p>
                    </div>
                </div>
                <div className="card manga-info-item">
                    <h3 className="card-header text-center">Info</h3>
                    <div className="card-block">
                        <p className="card-text">
                            <strong>Author:</strong> {manga.author}
                            <br />
                            <strong>Diferent Name:</strong> {manga.subName}
                            <br />
                            <strong>Group:</strong> {manga.group}
                            <br />
                            <div>
                                <strong>Genre:</strong> {genres}
                            </div>
                            <strong>Upload by:</strong> {manga.username}
                            <br />
                            <strong>Status:</strong> {manga.status}
                            <br />
                            <strong>Update:</strong> {manga.updatedAt}
                            <br />
                            <br />
                            <div className="row justify-content-center" style={{ display: isLogin ? "" : "none" }}>
                                <button type="button" className={isBookmarked ? "btn btn-danger" : "btn btn-outline-danger"} onClick={this.onBookmark}>
                                    <i className="far fa-bell">
                                        <strong> {isBookmarked ? "Un-bookmark" : "Bookmarked"} </strong>
                                    </i>
                                </button>
                            </div>
                        </p>
                    </div>
                </div>
                <div className="card manga-info-item">
                    <h3 className="card-header text-center">Chapter</h3>
                    <div className="card-block">
                        <p className="card-text">
                            <ul className="list-group">
                                {result}
                            </ul>
                        </p>
                    </div>
                </div>
                <div className="card manga-info-item">
                    <h3 className="card-header">Comments</h3>
                    <div className="card-block">
                        <div class="fb-comments" data-href={location} data-numposts="5"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MangaInfo;