import React, { Component } from 'react';
import apiCaller from '../apiCaller';
import MainLeft from '../components/MainLeft';
import MainRight from '../components/MainRight';
import MainCenter from '../components/MainCenter';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateList: [],
        }
    }

    componentWillMount() {
        let allManga = localStorage.getItem("allManga");
        allManga = JSON.parse(allManga);

        let bookmarkList = localStorage.getItem("bookmarkList");
        bookmarkList = JSON.parse(bookmarkList);

        let updateList = [];

        bookmarkList.forEach(e => {
            allManga.forEach(e1 => {
                if (e.id === e1._id && e.updatedAt < e1.updatedAt) {
                    updateList.push(e1);
                }
            })
        })
        this.setState({ updateList });
    }

    render() {
        let { updateList } = this.state;
        return (
            <div className="row">
                <div className="col-lg-3"> <MainLeft /> </div>
                <div className="col-lg-6">
                    <MainCenter mangas={updateList} />
                </div>
                <div className="col-lg-3"> <MainRight /> </div>
            </div>
        )
    }
}

export default Bookmark;