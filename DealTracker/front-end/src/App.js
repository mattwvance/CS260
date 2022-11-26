import React, { Component } from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import fetch from 'node-fetch';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Menu from './components/navbar';
import Home from './components/home';
import Games from './components/games';
import Footer from './components/footer'
const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  async getUser() {
    axios.get('/user/').then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }
  
  async getStores() {
    const response = await fetch('https://www.cheapshark.com/api/1.0/stores');
    const data = await response.json();
  }
  
  async getGame(title) {
    const response = await fetch('https://www.cheapshark.com/api/1.0/games?title=' + title);
    const data = await response.json();
  }

  render() {
    return (
      <div class="App">
        <Menu updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {!this.state.loggedIn &&
          <p>Sign Up to create your own Wishlist!</p>
        }
        
        <Routes>
          <Route exact path="/" element={<Home username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
          <Route path='/games' element={<Games username={this.state.username} updateUser={this.updateUser}/>}/>
          <Route path="/login" element={<LoginForm updateUser={this.updateUser}/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
        <Footer/>
        
      </div>
    );
  }
}
