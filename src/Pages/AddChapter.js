import React, { Component } from 'react';
import Uploader from '../components/Uploader';
import Preview from '../components/Preview';

class AddChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewUrl: []
        }
    }

    previewUrlReceiver = (previewUrl) => {
        this.setState({
            previewUrl
        })
    }

    render() {
        let { id } = this.props.match.params;
        let { previewUrl } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Uploader 
                            onReceivepreViewUrl={this.previewUrlReceiver} 
                            previewUrl = {previewUrl}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Preview previewUrl={previewUrl} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddChapter;