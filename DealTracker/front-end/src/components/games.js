import React, { Component } from 'react';
import fetch from 'node-fetch';
import axios from 'axios';
import './home.css';

const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class Games extends Component {
  
  constructor() {
    super();
    this.state = {
      games: null
    };
    this.getIcon = this.getIcon.bind(this);
    this.fetchWishlist = this.fetchWishlist.bind(this);
  }
  
  componentDidMount() {
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
  
  getIcon = (game) => {
    const url = this.props.allStores?.find(store => store.storeID === game.storeID).images.icon;
    return 'https://www.cheapshark.com' + url;
  }
  
  render() {
    return (
      <div>
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
                <button onClick={this.removeFromWishlist.bind(this, game)}>Remove from Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
 }
}