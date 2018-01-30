import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom';
import Home from './Pages/Home';
import New  from './components/New';
import Detail from './Pages/Detail';
import EditManga from './Pages/EditManga';


class App extends Component {
    render() {
        return (
            <BrowserRouter history={browserHistory}>
                <Fragment>
                    <Header />
                    <Navbar /> 
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/new" exact component={New} />
                        <Route path="/detail/:id" component={Detail} />
                        <Route path="/edit/manga" component={EditManga} />
                    </Switch>      
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default App;