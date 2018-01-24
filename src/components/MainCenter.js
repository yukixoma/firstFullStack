import React, { Component } from 'react';

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
        let {value} = e.target;
        if(value ==="+") this.setState({page: this.state.page + 1});
        else if (this.state.page>1) this.setState({page: this.state.page-1});
    }

    render() {
        return (
            <div>
                <div className="card-deck">
                    <div className="card main-item">
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-block">
                            <h4 className="card-title">Card title</h4>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-danger mr-sm-2" value="-"
                    onClick = {this.onPagination}
                    >
                        Pre
                    </button>
                    <button type="button" className="btn btn-success" value="+"
                    onClick = {this.onPagination}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}

export default MainCenter;