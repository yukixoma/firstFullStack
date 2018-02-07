import React, { Component } from 'react';
import MangaInfoPreview from './../components/MangaInfoPreview';
import apiCaller from '../apiCaller';

class EditMangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            manga: {},
            addGenre: "",
            msg: "Edit info and result will be display on Preview side",
            newCover: "",
        }
    }

    componentWillMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (username && password) {
            let id = this.props.match.params.id;
            let allManga = localStorage.getItem("allManga");
            allManga = JSON.parse(allManga);
            let manga = allManga.filter(e => {
                return e._id === id;
            })
            this.setState({
                id,
                manga: manga[0]
            });
        } else {
            console.log("Please log in");
            window.location.replace("/");
        }
    }

    onChange = e => {
        let { name, value } = e.target;
        let { manga } = this.state;
        if(name === "file") {
            let isLink = e.target.files[0] ? true : false;
            let newCover = isLink? URL.createObjectURL(e.target.files[0]) : "";
            this.setState({newCover})
        }
        else if (name !== "newGenre") {
            manga[name] = value;
        }
        this.setState({
            manga
        })
    }

    onRemoveGenre = e => {
        e.preventDefault();
        let { value } = e.target;
        let { manga } = this.state;
        manga.genre = manga.genre.filter(e => {
            return e !== value;
        })
        this.setState({
            manga
        })
    }

    onAddGenre = e => {
        e.preventDefault();
        let { value, name } = e.target;
        let { addGenre, manga } = this.state;
        if (name === "addGenre") {
            addGenre = addGenre.split(", ");
            addGenre.forEach(element => {
                manga.genre.push(element);
            });
            this.setState({
                addGenre: "",
                manga
            })
        } else {
            this.setState({
                addGenre: value
            })
        }
    }

    onEdit = e => {
        e.preventDefault();
        let form = document.getElementById("form");
        let formData = new FormData(form);
        apiCaller("POST", "/editMangaInfo", formData, (data, err) => {
            this.setState({
                msg: data.data
            })
        })
    }

    render() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let { manga, id, addGenre, msg, newCover } = this.state;
        let { name, subName, author, group, genre, description, status } = manga;
        let genres = [];
        genre.forEach(element => {
            genres.push(" " + element);
        });
        let genreEdit = genre.map((e, index) => {
            return (
                <button className="btn btn-danger" value={e} onClick={this.onRemoveGenre}>
                    {e}
                </button>
            )
        })
        return (
            <div className="container">
                <div className="alert alert-info" role="alert">
                    {msg}
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-block">
                                <form id="form" encType="multipart/form-data" onSubmit={this.onEdit} onChange={this.onChange}>
                                    <div style={{ display: "none" }}>
                                        <input name="username" value={username} />
                                        <input name="password" value={password} />
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" name="name" value={name} className="form-control" placeholder="Enter name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Sub-name</label>
                                        <input type="text" name="subName" value={subName} className="form-control" placeholder="Enter sub-name" />
                                    </div>
                                    <div style={{ display: "none" }}>
                                        <label>Genre</label>
                                        <input type="text" value={genres} name="genre" />
                                        <input type="text" value={id} name="id" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter genre"
                                            name="newGenre"
                                            value={addGenre}
                                            onChange={this.onAddGenre}
                                        />
                                        <button name="addGenre" className="btn btn-success my-sm-2" onClick={this.onAddGenre}>
                                            Add genre
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <label> Click to remove genre </label>
                                        <br />
                                        {genreEdit}
                                    </div>
                                    <div className="form-group">
                                        <label>Author</label>
                                        <input type="text" name="author" value={author} className="form-control" placeholder="Enter author name" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-sm-2"> Status </label>
                                        <select name="status" value={status} className="custom-select mb-2 mr-sm-2 mb-sm-0" >
                                            <option value="On going">On going</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Susspend">Suspend</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Translate Group</label>
                                        <input type="text" name="group" value={group} className="form-control" placeholder="Enter group name" required />
                                    </div>
                                    <div className="form-group form-inline">
                                        <label className="mr-sm-2">Upload Cover</label>
                                        <input type="file" name="file" className="form-control-file" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" name="description" value={description} rows="10" required></textarea>
                                    </div>
                                    <button className="btn btn-success" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <MangaInfoPreview manga={manga} id={id} newCover={newCover}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default EditMangaInfo;