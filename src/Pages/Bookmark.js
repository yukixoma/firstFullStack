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
        let { mangas } = this.props;
        let username = localStorage.getItem("username");
        let updateList = [];

        apiCaller("GET", `/fetchBookmarkList/${username}`, null, (res, err) => {
            if (err) alert(err);
            if (res) {                
                res.data.forEach(e => {
                    mangas.forEach(e1 => {
                        if (e.id === e1._id && e.updatedAt < e1.updatedAt) {
                            updateList.push(e1);
                        }
                    })
                })
                this.setState({ updateList });
            }
        })
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