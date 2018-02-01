import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MangaInfo extends Component {
    render() {
        let { manga, id } = this.props;
        let result = [];
        if (manga.chapter) {
            localStorage.setItem("manga",JSON.stringify(manga.chapter));
            for (let i = 0; i < manga.chapter.length; i++) {
                result.push(
                    <li key={i} className="list-group-item">
                        <Link to={"/read/" + id + "/" + i} exact="true">
                            Chapter {i + 1}
                        </Link>
                    </li>
                )
            }
        }
        return (
            <div className="card manga-info">
                <img src={manga.cover} class="img-fluid rounded manga-info-item" alt="Responsive image" />
                <div className="card manga-info-item">
                    <h3 className="card-header text-center">Description</h3>
                    <div className="card-block">
                        <p className="card-text text-justify">
                            {manga.description}
                        </p>
                    </div>
                </div>
                <div className="card manga-info-item">
                    <div className="card-block">
                        <p className="card-text">
                            <strong>Diferent Name:</strong> {manga.subName}
                            <br />
                            <strong>Group:</strong> {manga.group}
                            <br />
                            <strong>Genre:</strong> {manga.genre}
                            <br />
                            <strong>Upload by:</strong> {manga.username}
                            <br />
                            <strong>Status:</strong> {manga.status}
                            <br />
                            <strong>Update:</strong> {manga.updatedAt}
                            <br />
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
            </div>
        )
    }
}

export default MangaInfo;