import React, { Component } from 'react';

class EditChapterPreview extends Component {
    render() {
        let { chapter, preViewUrl } = this.props;
        let result = chapter[0].map((img, index) => {
            return (
                <img className="img-fluid" key={index} src={img} />
            )
        })
        if (preViewUrl.length > 0) {
            preViewUrl.forEach(e => {
                result.push(
                    <img className="img-fluid" src={e} />
                )
            });
        }
        return (
            <div className="card">
                <h3 className="card-header" style={{ backgroundColor: "#5cb85c", color: "white" }}>Preview</h3>
                <div className="card-block">
                    {result}
                </div>
            </div>
        )
    }
}

export default EditChapterPreview;