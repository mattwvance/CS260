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
        <Navbar.Brand className="App-title">Game Discounts</Navbar.Brand>
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