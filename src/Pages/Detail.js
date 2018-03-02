import React, { Component } from 'react';
import MainLeft from './../components/MainLeft';
import MainRight from './../components/MainRight';
import MangaInfo from '../components/MangaInfo';
import apiCaller from '../apiCaller';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manga: {},
        }
    }

    componentWillMount() {
        let { mangas, match } = this.props;
        let { id } = match.params;
        let manga = {};
        if (mangas.length === 0) {
            apiCaller("GET", "/fetchMangaList", null, (res, err) => {
                if (err) alert(err);
                if (res) {
                    manga = res.data.filter(e => {
                        return e._id === id;
                    })[0];
                    this.setState({ manga });
                }
            });
        } else {
            manga = mangas.filter(e => {
                return e._id === id;
            })[0];
            this.setState({ manga });
        }
    }


    render() {
        let { manga } = this.state;
        let { id } = this.props.match.params;
        window.scrollTo(0, 0);
        return (
            <div className="row">
                <div className="col-lg-3"><MainLeft /></div>
                <div className="col-lg-6">
                    <MangaInfo
                        manga={manga}
                        id={id}
                    />
                </div>
                <div className="col-lg-3"><MainRight /></div>
            </div>
        )
    }
}



export default Detail;