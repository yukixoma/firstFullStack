import React, { Component } from 'react';
import { actPaginate } from './../actions/index';
import { connect } from 'react-redux';

class Paginate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemPerPage: 5,
        }
    }

    onClick = e => {
        e.preventDefault();
        let { value } = e.target;
        let { page, itemPerPage } = this.state;
        let click = 0;
        let { arrayPage } = this.props;
        if (value === "-" && page > 1) {
            this.setState({ page: page - 1 }, () => {
                this.props.onReceivePaginate([]);
            });
        }
        if (value === "+" && (page - 1) * itemPerPage < arrayPage.length) {
            this.setState({ page: page + 1 }, () => {
                this.props.onPaginate(arrayPage, itemPerPage, page);
                let { paginated } = this.props;
                this.props.onReceivePaginate(paginated);
            });
        }
    }


    render() {
        let { arrayPage, paginated, result } = this.props;
        let { page, itemPerPage } = this.state;
        if (result.length === 0) {
            this.props.onPaginate(arrayPage, itemPerPage, page);
            this.props.onReceivePaginate(paginated);
        }
        return (
            <div className="card">
                <div className="card-block text-center">
                    <form className="form-inline">
                        <button type="button" value="-" className="btn btn-danger" onClick={this.onClick}>Pre</button>
                        <input type="text" className="form-control" />
                        <input type="text" className="form-control" />
                        <button type="button" value="+" className="btn btn-success" onClick={this.onClick}>Next</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        paginated: state.Paginate
    }
}

const mapDispatchToProps = (dispactch, props) => {
    return {
        onPaginate: (arrayPage, itemPerPage, page) => {
            dispactch(actPaginate(arrayPage, itemPerPage, page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);