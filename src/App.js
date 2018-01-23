import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { HashRouter, Route } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <Header />
                    <Navbar />
                </Fragment>
            </HashRouter>
        )
    }
}

export default App;