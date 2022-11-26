import React, { Component } from 'react';
// import GameList from './shared/game-list';
import axios from 'axios';
import './home.css';

export default class Games extends Component {
  
  constructor() {
    super();
    this.state = {
      games: null
    };
    this.fetchWishlist = this.fetchWishlist.bind(this);
  }
  
  async componentDidMount() {
    this.fetchWishlist();
  }
  
  async fetchWishlist() {
    try {
      let response = await axios.get('/game/');
      response = response.data;
      this.setState({ games: response }, () => { console.log(this.state.games) });
    } catch (error) {
      console.log(error);
    }
  }
  
  async removeFromWishlist(game) {
    try {
      let response = await axios.delete('/game/', {data: {game}});
      response = response.data;
      this.setState({games: response}, () => {console.log(this.state.games)});
    } catch(error) {
      console.log(error);
    }
  }
  
  render() {
    return (
      <div>
        <div class='list-wrapper'>
          {this.state.games?.map(game => ( 
            <div class='game-wrapper'>
              <img alt='game' class='image-style' src={game.thumb}/>
              <p class='price'>${game.salePrice}</p>
              <p class='strike price'>${game.normalPrice}</p>
              <button onClick={this.removeFromWishlist.bind(this, game)}>Remove from Wishlist</button>
            </div>
          ))}
        </div>
      </div>
    );
 }
}