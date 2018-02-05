import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        }
    }

    render() {
        let { mangas } = this.props;
        let result = [];
        if (mangas) {
            for (let i = 0; i < mangas.length; i++) {
                let genres = mangas[i].genre.map((genre,index) => {
                    return(
                        <Link className="badge badge-pill badge-info" key={index} to={"/list/genre/" + genre} exact="true" >
                            {genre}
                        </Link>
                    )
                })
                result.push(
                    <div className="card main-item" key={i}>
                        <div className="card-block row">
                            <div className="col-lg-4">
                                <img className="home-page-cover" src={mangas[i].cover} />
                            </div>
                            <div className="col-lg-8">
                                <h4 className="card-title">
                                    <Link to={"/detail/" + mangas[i]._id} target="_blank">
                                        {mangas[i].name}
                                    </Link>
                                </h4>
                                <div className="truncate text-justify">
                                    <p className="card-text">{mangas[i].description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">
                                <div className="row">
                                    <i className="fa fa-user col-lg-4" aria-hidden="true"> {mangas[i].username} </i>
                                    <i className="fa fa-clock-o col-lg-4" aria-hidden="true"> {mangas[i].updatedAt} </i>
                                </div>
                                <div>
                                    <i className="fa fa-tags" aria-hidden="true"> {genres} </i>
                                </div>
                            </small>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div>
                {result}
            </div>
        )
    }
}


export default MainCenter;