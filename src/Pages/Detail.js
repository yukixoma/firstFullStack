import React, { Component } from 'react';
import { actFetchMangaInfo } from './../actions/index';
import { connect } from 'react-redux';
import MainLeft from './../components/MainLeft';
import MainRight from './../components/MainRight';
import MangaInfo from '../components/MangaInfo';

class Detail extends Component {
    componentWillMount() {
        let id = this.props.match.params.id;
        this.props.getMangaInfo(id);
    }
    render() {
        let id = this.props.match.params.id;
        let manga = this.props.manga;
        return (
            <div className="row">
                <div className="col-lg-3"><MainLeft /></div>
                <div className="col-lg-6">
                    <MangaInfo
                        manga={manga[0]}
                        id={id}
                    />
                </div>
                <div className="col-lg-3"><MainRight /></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        manga: state.Manga
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMangaInfo: id => {
            dispatch(actFetchMangaInfo(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);