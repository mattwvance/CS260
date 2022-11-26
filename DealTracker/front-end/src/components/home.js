import React, { Component } from 'react';
import fetch from 'node-fetch';
import './home.css';
import axios from 'axios';

const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      games: null
    };
    this.fetchGame = this.fetchGame.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
  }
  
  componentDidMount() {
    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1', options)
    .then((response) => response.json())
    .then(gameList => {
      this.setState({ games: gameList }, () => { console.log(this.state.games) });
    });
  }
  
  fetchGame = async(data) => {
    const title = data.target.value;
    fetch('https://www.cheapshark.com/api/1.0/deals?onSale=1&storeID=1&title=' + title)
    .then((response) => response.json())
    .then(gameList => {
      this.setState({ games: gameList }, () => { console.log(this.state.games) });
    });
  }
  
  addToWishlist = async(data, game) => {
    try {
      await axios.post('/game/', { game: JSON.stringify(data) });
    } catch(error) {
      console.log('Error: ' + error);
    }
  }
  
  render() {
    
    return (
    <div>
      <form>
        <input class='search-bar' type='text' placeholder='Enter Game Title' onChange={this.fetchGame}/>
      </form>
      <div class='list-wrapper'>
        {this.state.games?.map(game => (
          <div class='game-wrapper'>
            <img alt='game' class='image-style' src={game.thumb}/>
            <p class='price'>${game.salePrice}</p>
            <p class='strike price'>${game.normalPrice}</p>
            {this.props.loggedIn &&
              <button onClick={this.addToWishlist.bind(this, game)}>Add to Wishlist</button>
            }
          </div>
        ))}
      </div>
    </div>
    );
  }
}
