import React, { Component } from 'react';
import apiCaller from './../apiCaller';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "New user register",
            email: "",
            username: "",
            password: "",
        }
    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { email, username, password } = this.state;
        let newRegister = {
            email,
            username,
            password
        }
        apiCaller("POST", "/register", newRegister, (data, err) => {
            this.setState({
                msg: data.data
            })
        });
    }
    render() {
        let { msg } = this.state;
        let alert = "alert";
        if(msg === "New user registed") alert += " alert-success";
        else alert += " alert-danger";
        return (
            <div className="container">
                <div className="card">
                    <div className={alert} role="alert">
                        {msg}
                    </div>
                    <div className="card-block">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input className="form-control" type="email" name="email" placeholder="Enter email"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" type="username" name="username" placeholder="Enter username"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" placeholder="Enter Password"
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Sign-up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;