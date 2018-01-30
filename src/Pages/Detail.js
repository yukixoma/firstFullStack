import React, { Component } from 'react';
import { actFetchMangaInfoFromServer } from './../actions/index';
import { connect } from 'react-redux';
import MainLeft from './../components/MainLeft';
import MainRight from './../components/MainRight';
import MangaInfo from '../components/MangaInfo';

class Detail extends Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getMangaDetail(id);
    }
    render() {
        let manga = this.props.manga;
        return (
            <div className="row">
                <div className="col-lg-3"><MainLeft /></div>
                <div className="col-lg-6">
                    <MangaInfo manga={manga} />
                </div>
                <div className="col-lg-3"><MainRight /></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        manga: state.Detail
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMangaDetail: (id) => {
            dispatch(actFetchMangaInfoFromServer(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);