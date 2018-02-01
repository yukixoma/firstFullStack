import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
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



class App extends Component {
    render() {
        return (
            <BrowserRouter history={browserHistory}>
                <Fragment>
                    <Header />
                    <Navbar /> 
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/new" exact component={NewManga} />
                        <Route path="/detail/:id" component={Detail} />
                        <Route path="/edit/manga" component={EditManga} />
                        <Route path="/add/chapter/:id" component={AddChapter} />
                        <Route path="/register" component={Register} /> 
                        <Route path="/read/:id/:chapter" component={Reader} />              
                    </Switch>      
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default App;