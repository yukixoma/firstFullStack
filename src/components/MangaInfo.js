import React, { Component } from 'react';

class MangaInfo extends Component {
    render() {
        let { manga } = this.props;
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
                            <br/>
                            <strong>Group:</strong> {manga.group}
                            <br/>
                            <strong>Genre:</strong> {manga.genre}
                            <br/>
                            <strong>Upload by:</strong> {manga.username}
                            <br/>
                            <strong>Status:</strong> {manga.status}
                            <br/>
                            <strong>Update:</strong> {manga.updatedAt}
                            <br/>
                        </p>
                    </div>
                </div>
                <div className="card manga-info-item">
                    <h3 className="card-header text-center">Chapter</h3>
                    <div className="card-block">
                        <p className="card-text">
                            {manga.chapter}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MangaInfo;