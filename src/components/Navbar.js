import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let manager = {display: "none"};
        if(username && password) {
            manager.display = "";
        }
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <div className="container">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/"> Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Bookmark</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">List</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Genre</a>
                            </li>
                            <li className="nav-item dropdown" style={manager}>
                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Manager
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <NavLink className="dropdown-item"  exact to="/new"> New Manga </NavLink>
                                    <NavLink className="dropdown-item"  exact to="/edit/manga"> Edit Uploaded Manga </NavLink>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;