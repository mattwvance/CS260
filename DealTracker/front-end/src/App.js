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
import Footer from './components/footer';
import Info from './components/info';
const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      allStores: undefined,
      game: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.setGame = this.setGame.bind(this);
  }

  async componentDidMount() {
    this.getUser();
    
    fetch('https://www.cheapshark.com/api/1.0/stores', options)
    .then((response) => response.json())
    .then(storeList => {
      this.setState({ allStores: storeList }, () => { console.log(this.state.allStores) });
    });
  }

  updateUser(userObject) {
    this.setState(userObject);
  }
  
  setGame(newGame) {
    this.setState({ game: newGame });
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
  
  async getGame(title) {
    const response = await fetch('https://www.cheapshark.com/api/1.0/games?title=' + title);
    const data = await response.json();
  }

  render() {
    return (
      <div class="App">
        <Menu updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Routes>
          <Route exact path="/" element={<Home username={this.state.username} loggedIn={this.state.loggedIn} setGame={this.setGame} allStores={this.state.allStores}/>}/>
          <Route path='/games' element={<Games username={this.state.username} allStores={this.state.allStores}/>}/>
          <Route path="/login" element={<LoginForm updateUser={this.updateUser}/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='info' element={<Info game={this.state.game}/>}/>
        </Routes>
        <Footer/>
        
      </div>
    );
  }
}
