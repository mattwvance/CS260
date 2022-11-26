import React, { Component } from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';

export default class Footer extends Component {
    render() {
        return (
            <div class='footer-container bg-dark'>
              <div class="footer">
                <div class="footer-item">
                  <p>https://github.com/mattwvance/CS260/tree/main/DealTracker</p>
                </div>
              </div>
            </div>
        );
    }
    
}