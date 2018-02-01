import React, { Component } from 'react';

class TopPanel extends Component {
    render() {
        let { mangas } = this.props;
        let cover = ["", "", ""];
        if (mangas.length > 0) {
            for (let i = 0; i < mangas.length; i++) {
                cover[i] = mangas[i].cover;
            }
        }
        return (
            <div className="card top-panel">
                <h3 className="card-header">Top Panel</h3>
                <div className="card-block">
                    <div className="row">
                        <div className="card">
                            <img className="card-img-top top-panel-item" src={cover[0]} />
                        </div>
                        <div className="card">
                            <img className="card-img-top top-panel-item" src={cover[1]} />
                        </div>
                        <div className="card">
                            <img className="card-img-top top-panel-item" src={cover[2]} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopPanel;