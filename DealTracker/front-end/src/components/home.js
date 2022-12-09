import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import SearchFilter from './filter';
import './home.css';
import axios from 'axios';

const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      games: null,
      searchStores: null
    };
    this.getIcon = this.getIcon.bind(this);
    this.fetchGame = this.fetchGame.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    fetch('https://www.cheapshark.com/api/1.0/deals?', options)
    .then((response) => response.json())
    .then(gameList => {
      this.setState({ games: gameList }, () => { console.log(this.state.games) });
    });
  }
  
  fetchGame = async(data) => {
    const title = data.target.value;
    if (this.state.searchStores === null) {
      fetch('https://www.cheapshark.com/api/1.0/deals?onSale=1&title=' + title)
      .then((response) => response.json())
      .then(gameList => {
        this.setState({ games: gameList }, () => { console.log(this.state.games) });
      });
    } else {
      fetch(`https://www.cheapshark.com/api/1.0/deals?onSale=1&title=${title}&storeID=${this.state.searchStores}`)
      .then((response) => response.json())
      .then(gameList => {
        this.setState({ games: gameList }, () => { console.log(this.state.games) });
      });
    }
  }
  
  addToWishlist = async(data, game) => {
    try {
      await axios.post('/game/', { game: JSON.stringify(data) });
    } catch(error) {
      console.log('Error: ' + error);
    }
  }
  
  handleChange = (event) => {
    var list = this.state.searchStores;
    if (event.target.checked) {
      if (list === null) list = event.target.value;
      else {
        list = list + ',' + event.target.value;
      }
    } else {
      list = list.replace(event.target.value + ',', '');
    }
    this.state.searchStores = list;
  }
  
  getIcon = (game) => {
    const url = this.props.allStores?.find(store => store.storeID === game.storeID).images.icon;
    return 'https://www.cheapshark.com' + url;
  }
  
  render() {
    return (
    <div class='page-container'>
      <div class='container-row'>
        <SearchFilter class='container-item' handleChange={this.handleChange} stores={this.props.allStores}/>
        <div>
          {!this.props.loggedIn &&
            <span>Sign Up to create your own Wishlist!</span>
          }
          <form>
            <input class='search-bar' type='text' placeholder='Enter Game Title' onChange={this.fetchGame}/>
          </form>
          <div class='list-wrapper'>
            {this.state.games?.map(game => (
              <div class='game-container'>
                <div class='image-wrapper'>
                  <img alt='game' class='image-style' src={game.thumb}/>
                </div>
                <div class='price-container'>
                  <div>
                    <img class='icon' src={this.getIcon(game)}/>
                    <span class='price'>${game.salePrice}</span>
                    <span class='strike price'>${game.normalPrice}</span>
                  </div>
                  {this.props.loggedIn &&
                    <button onClick={this.addToWishlist.bind(this, game)}>Add to Wishlist</button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  }
}


// <Link to='info' onClick={this.props.setGame(game)}><img alt='game' class='image-style' src={game.thumb}/></Link>