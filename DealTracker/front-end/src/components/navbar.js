import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default class Menu extends Component {
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
      <Navbar className='d-flex justify-content-between' bg='dark' expand='sm' variant='dark' sticky='top'>
        <Navbar.Brand className="App-title">Steam Game Discounts</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            {loggedIn ? (
            <ul className="navbar-nav">
              <li className="nav-item m-1">
                <Link to="/" className="btn btn-link text-secondary">Home</Link>
              </li>
              <li className="nav-item m-1">
                <Link to='/games' className="btn btn-link text-secondary">My Games</Link>
              </li>
              <li className="nav-item m-1">
                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>Logout</Link>
              </li>
            </ul>
            ) : (
            <ul className="navbar-nav">
              <li className="nav-item m-1">
                <Link to="/" className="btn btn-link text-secondary">Home</Link>
              </li>
              <li className="nav-item m-1">
                <Link to='/login' className="btn btn-link text-secondary">Login</Link>
              </li>
              <li className="nav-item m-1">
                <Link to="signup" className="btn btn-link text-secondary">Sign Up</Link>
              </li>
            </ul>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
          
          
          
      //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="nav-container">
      //   <b className="navbar-brand">Steam Game Discounts</b>
      //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>
        
      // </nav>