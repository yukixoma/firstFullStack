import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Navbar />
            </Fragment>
        )
    }
}

export default App;