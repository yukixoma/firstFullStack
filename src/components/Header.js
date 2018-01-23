import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 10 }}>
                <div className="row" >
                    <div className="col-lg-6">
                        <h1>Manga Reader Web</h1>
                    </div>
                    <div className="col-lg-6">
                        <div className="float-right">
                            <form className="form-inline">
                                <input type="username" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Username" />
                                <input type="password" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Password" />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;