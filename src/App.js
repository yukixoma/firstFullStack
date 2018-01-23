import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <h1> React Webpack </h1>
            </Fragment>
        )
    }
}

export default App;