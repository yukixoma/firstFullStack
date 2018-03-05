import React, { Component } from 'react';
import apiCaller from '../apiCaller';
import MainLeft from '../components/MainLeft';
import MainRight from '../components/MainRight';
import MainCenter from '../components/MainCenter';
import paginate from '../paginate';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarkList: [],
            updateList: [],
            displayList: [],
            select: "update",
            sortOption: 1,
        }
    }

    componentWillMount() {
        let { mangas } = this.props;
        let username = localStorage.getItem("username");
        let bookmarkList = [];
        let updateList = [];
        let getMangaList = () => {
            apiCaller("GET", "/fetchMangaList", null, (res, err) => {
                if (err) console.log(err);
                if (res) {
                    mangas = res.data;
                    getBookmarkList();
                }
            });
        }
        let getBookmarkList = () => {
            apiCaller("GET", `/fetchBookmarkList/${username}`, null, (res, err) => {
                if (err) alert(err);
                if (res) {
                    res.data.forEach(e => {
                        mangas.forEach(e1 => {
                            if (e.id === e1._id) {
                                if (e.updatedAt < e1.updatedAt) {
                                    updateList.push(e1);
                                }
                                bookmarkList.push(e1);
                            }
                        })
                    })
                    this.setState({
                        bookmarkList,
                        updateList,
                        displayList: updateList
                    });
                }
            })
        }
        if (mangas.length === 0) {
            getMangaList();
        } else {
            getBookmarkList();
        }
    }

    onChange = e => {
        let select = e.target.value;
        let { updateList, bookmarkList } = this.state;
        if (select === "all") {
            this.setState({
                select: "all",
                displayList: bookmarkList
            });
        } else {
            this.setState({
                select: "update",
                displayList: updateList
            })
        }
    }

    onSort = e => {
        let sortOption = parseInt(e.target.value, 10);
        this.setState({ sortOption });
    }

    render() {
        let { displayList, select, sortOption } = this.state;
        let itemPerPage = displayList.length - 1;
        displayList = paginate(displayList, null, null, sortOption);
        return (
            <div className="row">
                <div className="col-lg-3"> <MainLeft /> </div>
                <div className="col-lg-6">
                    <div className="card main-item">
                        <h3 class="card-header" style={{ backgroundColor: "#ffbb33", color: "white" }}> Bookmark List Manager </h3>
                        <div className="card-block" >
                            <div className="row">
                                <div className="col-lg-6">
                                    <form className="form-inline justify-content-center" onChange={this.onSort}>
                                        <label> Sort by &nbsp; </label>
                                        <select className="form-control" name="sortOption" value={sortOption}>
                                            <option value="1">LIFO</option>
                                            <option value="2">FIFO</option>
                                            <option value="3">A - Z</option>
                                            <option value="4">Z - A</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="col-lg-6">
                                    <form className="form-inline justify-content-center" onChange={this.onChange}>
                                        <label> List by &nbsp; </label>
                                        <select className="form-control" value={select} >
                                            <option value="updated"> Updated </option>
                                            <option value="all"> All </option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MainCenter mangas={displayList} />
                </div>
                <div className="col-lg-3"> <MainRight /> </div>
            </div>
        )
    }
}

export default Bookmark;