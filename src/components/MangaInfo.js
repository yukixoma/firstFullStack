import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MangaInfo extends Component {

    render() {
        let { manga, id } = this.props;
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
            genres = manga.genre.map((genre,index) => {
                return(
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
                    <div className="card-block">
                        <p className="card-text">
                            <strong>Author:</strong> {manga.author}
                            <br/>
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