import React, { Component } from 'react';
import MainLeft from './../components/MainLeft';
import MainRight from './../components/MainRight';
import MangaInfo from '../components/MangaInfo';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            manga: {}
        }
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        let { mangas } = this.props;
        let manga = mangas.filter(e => {
            return e._id === id;
        })
        this.setState({
            id,
            manga: manga[0]
        });
    }

    render() {
        let { manga, id } = this.state;
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