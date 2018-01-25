import React, { Component } from 'react'

class Upload extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 card">
                        <div className="card-block">
                            <form action="/new" method="post" encType="multipart/form-data">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control" placeholder="Enter name" required />
                                </div>
                                <div className="form-group">
                                    <label>Upload Cover</label>
                                    <input type="file" name="file" className="form-control-file" required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" name="description" id="exampleTextarea" rows="10" required></textarea>
                                </div>
                                <button className="btn btn-success" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Upload