import React, { Component } from 'react';
import fetch from 'node-fetch';

const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class Info extends Component {
  constructor() {
    super();
  }
    
  componentDidMount() {
    console.log(this.props.game);
  }
    
  render() {
    return (
      <div>
        <div>
          
        </div>
      </div>
    );
  }
  
  
    
}