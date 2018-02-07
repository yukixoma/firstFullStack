import React, { Component, Fragment } from 'react';
import TopPanel from './../components/TopPanel';
import MainLeft from './../components/MainLeft';
import MainCenter from './../components/MainCenter';
import MainRight from './../components/MainRight';
import paginate from '../paginate';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemPerPage: 5,
            sortOption: 1
        }
    }

    onClick = e => {
        e.preventDefault();
        let { page, itemPerPage } = this.state;
        let { value } = e.target;
        let { mangas } = this.props;
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

    onManualPaginate = e => {
        let { itemPerPage } = this.state;
        let { mangas } = this.props;
        let { value } = e.target;
        value = value ? parseInt(value, 10) : value;
        if (value > 0 && (value - 1) * itemPerPage < mangas.length) {
            this.setState({ page: value });
        }
        if (!value) {
            this.setState({
                page: ""
            })
        }

    }
    onSort = e => {
        let { value } = e.target;
        value = value ? parseInt(value, 10) : value;
        this.setState({
            page: 1,
            sortOption: value
        });

    }

    onBlur = e => {
        let { value } = e.target;
        if (!value) {
            this.setState({
                page: 1
            })
        }
    }

    render() {
        let { mangas } = this.props;
        let { page, itemPerPage, sortOption } = this.state;
        let paginated = paginate(mangas, itemPerPage, page, sortOption);
        return (
            <div className="row">
                <div className="col-lg-3"><MainLeft /></div>
                <div className="col-lg-6">
                    <TopPanel mangas={mangas} />
                    <div className="main-item">
                        <div className="card">
                            <div className="row">
                                <div className="col-sm-4"></div>
                                <div className="col-sm-4">
                                    <form className="form-inline justify-content-center">
                                        <label> Page &nbsp; </label>
                                        <input name="page" className="page-index form-control text-center mr-sm-2" value={page} onChange={this.onManualPaginate} onBlur={this.onBlur} />
                                    </form>
                                </div>
                                <div className="col-sm-4">
                                    <form className="form-inline" onChange={this.onSort}>
                                        <label> Sort by &nbsp; </label>
                                        <select class="form-control" name="sortOption" value={sortOption}>
                                            <option value="1">LIFO</option>
                                            <option value="2">FIFO</option>
                                            <option value="3">A - Z</option>
                                            <option value="4">Z - A</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MainCenter mangas={paginated} />
                    <div className="main-item">
                        <div className="card">
                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="row justify-content-center">
                                        <button type="button" value="-" className="btn btn-danger mr-sm-2" onClick={this.onClick}>
                                            Prev
                                        </button>
                                        <div className="text-center">
                                            <input name="page" className="form-control text-center page-index mr-sm-2" value={page} onChange={this.onManualPaginate} onBlur={this.onBlur} />
                                        </div>
                                        <button type="button" value="+" className="btn btn-success " onClick={this.onClick}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3"><MainRight /></div>
            </div>
        )
    }
}

export default HomePage;