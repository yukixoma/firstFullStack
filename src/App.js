import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchAllMangaFromServer } from './actions/index';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import EditManga from './Pages/EditManga';
import Register from './Pages/Register';
import AddChapter from './Pages/AddChapter';
import Reader from './Pages/Reader';
import NewManga from './Pages/NewManga';
import NotFound from './Pages/NotFound';
import EditMangaInfo from './Pages/EditMangaInfo';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "out"
        }
    }

    componentWillMount() {
        this.props.fetchAllManga();
    }

    onLogInOut = (option) => {
        this.setState({
            state: option
        })
    }

    render() {
        let { mangas } = this.props;
        return (
            <BrowserRouter history={browserHistory}>
                <Fragment>
                    <Header LogInOut={this.onLogInOut} />
                    <Navbar mangas={mangas} />
                    <Switch>
                        <Route path="/" note="abc" exact
                            render={() => <Home mangas={mangas} />}
                        />
                        <Route path="/new" exact component={NewManga} />
                        <Route path="/detail/:id" component={Detail} />
                        <Route path="/edit/manga" exact component={EditManga} />
                        <Route path="/edit/manga/:id" exact component={EditMangaInfo} />
                        <Route path="/add/chapter/:id"
                            render={(match) => <AddChapter match={match.match} mangas={mangas} />}
                        />
                        <Route path="/register" component={Register} />
                        <Route path="/read/:id/:chapter" component={Reader} />
                    </Switch>
                </Fragment>
            </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);