import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiCaller from './../apiCaller';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name] : value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let newLogin = this.state;
        apiCaller("POST", "/login", newLogin, (data, err) => {
            alert(data.data);
            if (data.data === "Login success") {
                localStorage.setItem("username", this.state.username);
                localStorage.setItem("password", this.state.password);
                this.setState({
                    username: "",
                    password: ""
                })
            }
        })

    }

    render() {
        return (
            <div style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 10, color: "white" }}>
                <div className="row" >
                    <div className="col-lg-6">
                        <h1>Manga Reader Web</h1>
                    </div>
                    <div className="col-lg-6 text-right">
                        <div className="float-right">
                            <form className="form-inline" onSubmit={this.onSubmit}>
                                <input type="username" name="username" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Username"
                                    value={this.state.username} onChange={this.onChange}
                                />
                                <input type="password" name="password" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Password"
                                    value={this.state.password} onChange={this.onChange}
                                />
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <div style={{ marginRight: 7 }}>
                                <Link exact="true" to="/register"> Sign-up </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;