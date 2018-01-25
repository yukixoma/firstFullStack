import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import New  from './components/New';



class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <Header />
                    <Navbar /> 
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/upload" exact component={New} />
                    </Switch>          
                </Fragment>
            </HashRouter>
        )
    }
}

export default App;