import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

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
		
		axios.post('/user/signup', {
			username: this.state.username,
			password: this.state.password
		}).then(response => {
			console.log(response)
			if (!response.data.errmsg) {
				alert('Signup Successful!');
				this.setState({ //redirect to login page
					redirectTo: '/login'
				});
			} else {
				alert('Username already taken');
			}
		}).catch(error => {
			console.log('signup error: ');
			console.log(error);
		});
	}


render() {
	return (
		<div class="SignupForm">
			<h4>Sign up</h4>
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
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>
	);
}
}

export default Signup
