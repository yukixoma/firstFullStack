import React, { Component } from 'react';

class Preview extends Component {
    render() {
        let preview = [];
        let { previewUrl } = this.props;
        for (let i = 0; i < previewUrl.length; i++) {
            preview.push(
                <img className="img-fluid" key={i} src={previewUrl[i]} />
            )
        }
        return (
            <div className="card">
                <h3 class="card-header" style={{backgroundColor: "#5cb85c",color:"white"}}>Preview</h3>
                <div class="card-block">
                    {preview}
                </div>
            </div>
        )
    }
}

export default Preview;