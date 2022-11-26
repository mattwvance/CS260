import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/src/collapse.js";

export default class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    axios.post('/user/logout').then(response => {
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        });
      }
    }).catch(error => {
        console.log('Logout error');
    });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="nav-container">
        <b className="navbar-brand">Steam Game Discounts</b>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id='navbarNav'>
          
        </div>
      </nav>
    );
  }
}

// <Link to="/" className="btn btn-link text-secondary">
//               <span className="text-secondary">Home</span>
//             </Link>
//             <Link to='/games' className="btn btn-link text-secondary">
//               <span className="text-secondary">My Games</span>
//             </Link>
//             <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
//               <span className="text-secondary">Logout</span>
//             </Link>

          // <div className="navbar-section">
          //   <Link to="/" className="btn btn-link text-secondary">
          //     <span className="text-secondary">Home</span>
          //   </Link>
          //   <Link to='/games' className="btn btn-link text-secondary">
          //     <span className="text-secondary">My Games</span>
          //   </Link>
          //   <Link to="/login" className="btn btn-link text-secondary">
          //     <span className="text-secondary">Login</span>
          //   </Link>
          //   <Link to="/signup" className="btn btn-link">
          //     <span className="text-secondary">Sign Up</span>
          //   </Link>
          // </div>