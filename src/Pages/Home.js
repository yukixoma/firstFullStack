import React, { Component, Fragment } from 'react';
import TopPanel from './../components/TopPanel';
import MainLeft from './../components/MainLeft';
import MainCenter from './../components/MainCenter';
import MainRight from './../components/MainRight';
import { actFetchAllMangaFromServer } from './../actions/index';
import { connect } from 'react-redux';

class HomePage extends Component {
    componentDidMount() {
        this.props.fetchAllManga();
    }
    render() {
        let { mangas } = this.props;
        let timeSortedList = mangas.sort((a,b)=>{
            return (a.updatedAt > b.updatedAt) ? -1 : ((a.updatedAt < b.updatedAt) ? 1 : 0);
        });

        return (
            <div className="row">
                <div className="col-lg-3"><MainLeft /></div>
                <div className="col-lg-6">
                    <TopPanel mangas={timeSortedList} />
                    <MainCenter mangas={timeSortedList} />
                </div>
                <div className="col-lg-3"><MainRight /></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mangas: state.Manga
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllManga: () => {
            dispatch(actFetchAllMangaFromServer())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);