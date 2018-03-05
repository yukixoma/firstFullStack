import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import replaceNonASCII from './../replaceNonASCCII';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ASCCIIonlyList: [],
            mangas: [],
            searchResult: [],
            searchTerm: ""
        }
    }

    componentDidUpdate() {
        if (this.state.mangas.length === 0) {
            let { mangas } = this.props;
            let ASCCIIonlyList = [];
            mangas.forEach(element => {
                ASCCIIonlyList.push({
                    name: replaceNonASCII(element.name),
                })
            });
            this.setState({
                ASCCIIonlyList,
                mangas
            })
        }
    }

    onChange = (e) => {
        let { ASCCIIonlyList, mangas } = this.state;
        let { value } = e.target;
        this.setState({ searchTerm: value });
        if (value.length > 2) {
            value = replaceNonASCII(value);
            let regex = new RegExp(value, "gi");
            let searchResult = [];
            for (let i = 0; i < mangas.length; i++) {
                if (ASCCIIonlyList[i].name.match(regex)) {
                    searchResult.push(mangas[i]);
                }
            }
            this.setState({
                searchResult
            })
        } else {
            this.setState({
                searchResult: []
            })
        }
    }

    onClear = e => {
        this.setState({
            searchTerm: "",
            searchResult: []
        })
        
    }

    render() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let { searchResult, searchTerm } = this.state;
        let isResultDisplay = searchResult.length === 0 ? { display: "none" } : { display: "" };
        let searchResultDisplay = searchResult.map((item, index) => {
            return (
                <div className="row" key={index}>
                    <Link to={"/detail/" + item._id} target="_blank" onClick={this.onClear}>
                        <img style={{ maxWidth: 50, maxHeight: 50 }} src={item.cover} />
                        {item.name}
                    </Link>
                    <br />
                </div>
            )
        })
        let manager = { display: "none" };
        if (username && password) {
            manager.display = "";
        }
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <div className="container">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">Refresh</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/"> Home </NavLink>
                            </li>
                            <li className="nav-item" style={manager}>
                                <NavLink className="nav-link" exact to="/bookmark"> Bookmarked </NavLink>
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
                                    <NavLink className="dropdown-item" exact to="/new"> New Manga </NavLink>
                                    <NavLink className="dropdown-item" exact to="/edit/manga"> Edit Uploaded Manga </NavLink>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                        <form style={{ position: "relative" }} className="form-group my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" value={searchTerm}
                                onChange={this.onChange}
                            />
                            <div className="form-control search-box" style={isResultDisplay}>
                                {searchResultDisplay}
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;