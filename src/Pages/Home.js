import React, { Component, Fragment } from 'react';
import TopPanel from './../components/TopPanel';
import MainLeft from './../components/MainLeft';
import MainCenter from './../components/MainCenter';
import MainRight from './../components/MainRight';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemPerPage: 5,
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

    onChange = e => {
        let { itemPerPage } = this.state;
        let { mangas } = this.props;
        let { value } = e.target;
        value = value ? parseInt(value, 10) : value;
        if (value > 0 && (value - 1) * itemPerPage < mangas.length) {
            this.setState({ page: value });
        }
    }

    render() {
        let { mangas } = this.props;
        let { page, itemPerPage } = this.state;
        let paginated = [];
        for (let i = (page - 1) * itemPerPage; i < mangas.length && i < (page * itemPerPage); i++) {
            paginated.push(mangas[i]);
        }
        return (
            <div className="row">
                <div className="col-lg-3"><MainLeft /></div>
                <div className="col-lg-6">
                    <TopPanel mangas={mangas} />
                    <MainCenter mangas={paginated} />
                    <div className="main-item">
                        <div className="card">
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <form className="form-inline">
                                        <button type="button" value="-" className="btn btn-danger mr-sm-2" onClick={this.onClick}>
                                            Prev
                                        </button>
                                        <input className="form-control text-center paginate-input mr-sm-2" value={page} onChange={this.onChange} />
                                        <button type="button" value="+" className="btn btn-success " onClick={this.onClick}>
                                            Next
                                        </button>
                                    </form>
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