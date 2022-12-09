import React, { Component } from 'react';
import fetch from 'node-fetch';
import './filter.css'

const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class SearchFilter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class='container-item'>
        <h3>Search Filters</h3>
        <br/>
        <div class='list'>
          <h4>Stores</h4>
          <i>(Defult is all stores)</i>
          {this.props.stores?.map(store => ( 
            <div class='list-item'>
              <input type='checkbox' onChange={ this.props.handleChange } value={ store.storeID }></input>
              <img alt='store' class='icon' src={'https://www.cheapshark.com'+ store.images.icon}/>
              <span class='text'>{store.storeName}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}