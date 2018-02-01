import React, { Component } from 'react';

class NewMangaForm extends Component {
    componentDidMount() {
        let username = localStorage.getItem("username");
        if(!username) {
            alert("Please log in");
            window.location.replace("/");
        }
    }
    render() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8 card">
                        <div className="card-block">
                            <form action="/new" method="post" encType="multipart/form-data">
                                <div style={{display: "none"}}>
                                    <input name="username" value={username}/> 
                                    <input name="password" value={password}/>  
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control" placeholder="Enter name" required />
                                </div>
                                <div className="form-group">
                                    <label>Sub-name</label>
                                    <input type="text" name="subName" className="form-control" placeholder="Enter sub-name" />
                                </div>
                                <div className="form-group">
                                    <label>Genre</label>
                                    <input type="text" name="genre" className="form-control" placeholder="Enter genre" required />
                                </div>
                                <div className="form-group">
                                    <label>Author</label>
                                    <input type="text" name="author" className="form-control" placeholder="Enter author name" required />
                                </div>
                                <div className="form-group">
                                    <label className="mr-sm-2"> Status </label>
                                    <select name="status" className="custom-select mb-2 mr-sm-2 mb-sm-0" >
                                        <option value="On going">On going</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Susspend">Suspend</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Translate Group</label>
                                    <input type="text" name="group" className="form-control" placeholder="Enter group name" required />
                                </div>
                                <div className="form-group form-inline">
                                    <label className="mr-sm-2">Upload Cover</label>
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

export default NewMangaForm;