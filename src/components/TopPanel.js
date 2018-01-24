import React, { Component } from 'react';

class TopPanel extends Component {
    render() {
        return (
            <div className="card">
                <h3 className="card-header">Top Panel</h3>
                <div className="card-block">
                    <div className="row">
                        <div>
                            <div className="card">
                                <img className="card-img-top" src="" alt="Card image cap" />
                                <div className="card-block">
                                    <h3 className="card-title">Special title treatment</h3>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <img className="card-img-top" src="" alt="Card image cap" />
                                <div className="card-block">
                                    <h3 className="card-title">Special title treatment</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopPanel;