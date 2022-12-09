import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/user/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username,
                    game: null
                });
                this.setState({
                    redirectTo: '/'
                });
            }
        }).catch(error => {
            alert('User Does Not Exist');
            console.log('login error: ');
            console.log(error);
            
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Navigate to={{ pathname: this.state.redirectTo }} />;
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <form class="form-horizontal d-inline-flex flex-column">
                        <div class="form-group d-inline-flex flex-row justify-content-space-between">
                            <label class="form-label" htmlFor="username">Username:</label>
                            <input class="form-input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div class="form-group d-inline-flex flex-row justify-content-space-between">
                            <label class="form-label" htmlFor="password">Password: </label>
                            <input class="form-input"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div class="form-group ">
                            <button
                                class="btn btn-primary"
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default LoginForm;
