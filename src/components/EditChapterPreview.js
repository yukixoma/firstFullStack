import React, { Component } from 'react';

class EditChapterPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 0,
        }
    }
    componentWillMount() {
        let {chapter} = this.props;
        let length = chapter[0].length;
        this.setState({
            length
        })
    }

    render() {
        let { chapter, preViewUrl, singlePreviewUrl, imgIndex } = this.props;
        let { length } = this.state;
        let result = chapter[0].map((img, index) => {
            return (
                <div className="card">
                    <img className="img-fluid" key={index} src={img} />
                </div>
            )
        })
        if (preViewUrl.length > 0) {
            preViewUrl.forEach(e => {
                result.push(
                    <div className="card">
                        <img className="img-fluid" src={e} />
                    </div>
                )
            });
        }
        if (singlePreviewUrl) {            
            result.splice(imgIndex, 0,
                <div className="card add-img">
                    <div className="card-block">
                        <img className="img-fluid" src={singlePreviewUrl} />
                    </div>
                </div>
            )
        }
        if (!singlePreviewUrl && result.length !== length) {
            result.splice(imgIndex, 1);
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