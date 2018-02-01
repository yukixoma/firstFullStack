import React, { Component } from 'react';

class Reader extends Component {
    render() {
        let manga = localStorage.getItem("manga");
        manga = JSON.parse(manga);
        let result = [];
        let { id, chapter } = this.props.match.params;
        for (let i = 0; i < manga[chapter][0].length; i++) {
            result.push(
                <div className="card-block">
                    <img key={i} className="img-fluid img-center" src={manga[chapter][0][i]} />
                </div>
            )
        }
        return (
            <div className="card" style={{ backgroundColor: "grey" }}>
                {result}
            </div>
        )
    }
}

export default Reader;