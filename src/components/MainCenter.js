import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MainCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        }
    }
    onPagination = (e) => {
        e.preventDefault();
        let { value } = e.target;
        if (value === "+") this.setState({ page: this.state.page + 1 });
        else if (this.state.page > 1) this.setState({ page: this.state.page - 1 });
    }

    render() {
        let { mangas } = this.props;
        let result = [];
        if (mangas) {
            for (let i = 0; i < mangas.length; i++) {
                result.push(
                    <div className="card main-item" key={i}>
                        <div className="card-block row">
                            <div className="col-lg-4">
                                <img className="home-page-cover" src={mangas[i].cover} />
                            </div>
                            <div className="col-lg-8">
                                <h4 className="card-title">
                                    <Link to={"detail/" + mangas[i]._id}>
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
                                    <i className="fa fa-tags" aria-hidden="true"> {mangas[i].genre} </i>
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
                <div className="text-center">
                    <button type="button" className="btn btn-danger mr-sm-2" value="-"
                        onClick={this.onPagination}
                    >
                        Pre
                    </button>
                    <button type="button" className="btn btn-success" value="+"
                        onClick={this.onPagination}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}


export default MainCenter;