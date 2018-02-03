import React, { Component } from 'react';
import NewMangaForm from '../components/NewMangaForm';

class NewManga extends Component {
    componentWillMount() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if(!username || !password) {
            alert("Please log in");
            window.location.replace("/");
        }
    }
    render() {
        return (
            <div>
                <NewMangaForm/>
            </div>
        )
    }
}

export default NewManga