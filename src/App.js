import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import apiCaller from './apiCaller';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import EditManga from './Pages/EditManga';
import Register from './Pages/Register';
import AddChapter from './Pages/AddChapter';
import Reader from './Pages/Reader';
import NewManga from './Pages/NewManga';
import NotFound from './Pages/NotFound';
import EditMangaInfo from './Pages/EditMangaInfo';
import EditChapter from './Pages/EditChapter';
import Bookmark from './Pages/Bookmark';




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "out",
            mangas: []
        }
    }

    componentWillMount() {
        apiCaller("GET", "/fetchMangaList", null, (res, err) => {
            if (err) throw err;
            this.setState({
                mangas: res.data
            })
            let allManga = JSON.stringify(res.data);
            localStorage.setItem("allManga", allManga);
        });

        let username = localStorage.getItem("username");
        if (username) {
            apiCaller("GET", "/fetchBookmarkList/" + username, null, (res, err) => {
                if (err) alert("Cannot get bookmark list");
                if (res) {
                    localStorage.setItem("bookmarkList", JSON.stringify(res.data));
                }
            })
        }
    }

    onLogInOut = (option) => {
        this.setState({
            state: option
        })
    }

    render() {
        let { mangas } = this.state;
        return (
            <BrowserRouter history={browserHistory}>
                <Fragment>
                    <Header LogInOut={this.onLogInOut} />
                    <Navbar mangas={mangas} />
                    <Switch>
                        <Route path="/" exact
                            render={() => <Home mangas={mangas} />}
                        />
                        <Route path="/bookmark" exact component={Bookmark} />
                        <Route path="/new" exact component={NewManga} />
                        <Route path="/detail/:id"
                            render={(match) => <Detail match={match.match} mangas={mangas} />}
                        />
                        <Route path="/edit/manga" exact
                            render={(match) => <EditManga match={match.match} mangas={mangas} />}
                        />
                        <Route path="/edit/manga/:id" exact component={EditMangaInfo} />
                        <Route path="/add/chapter/:id"
                            render={(match) => <AddChapter match={match.match} mangas={mangas} />}
                        />
                        <Route path="/edit/chapter/:id"

                            render={(match) => <EditChapter match={match.match} mangas={mangas} />}
                        />
                        <Route path="/register" component={Register} />
                        <Route path="/read/:id/:chapter"
                            render={(match) => <Reader match={match.match} mangas={mangas} />}
                        />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default App;