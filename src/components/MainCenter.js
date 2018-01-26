import React, { Component } from 'react';
import { actFetchAllMangaFromServer } from './../actions/index';
import { connect } from 'react-redux';

class MainCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        }
    }

    componentDidMount() {
        this.props.fetchAllMagas();
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
                                <h4 className="card-title">{mangas[i].name}</h4>
                                <p className="card-text">{mangas[i].description}</p>
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
                <div className="card-deck">
                    {result}
                </div>
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

const mapStateToProps = state => {
    return {
        mangas: state.Manga
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllMagas: () => {
            dispatch(actFetchAllMangaFromServer())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCenter);