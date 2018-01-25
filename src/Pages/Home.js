import React, { Component, Fragment } from 'react';
import TopPanel from './../components/TopPanel';
import MainLeft from './../components/MainLeft';
import MainCenter from './../components/MainCenter';
import MainRight from './../components/MainRight';

class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopPanel />
                <div className="row">
                    <div className="col-3"><MainLeft /></div>
                    <div className="col-6"><MainCenter /></div>
                    <div className="col-3"><MainRight /></div>
                </div>
            </Fragment>
        )
    }
}

export default HomePage;