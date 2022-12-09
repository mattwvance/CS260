import React, { Component } from 'react';
import fetch from 'node-fetch';
import './filter.css';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const options = {method: 'GET', headers: {accept: 'application/json'}};

export default class SearchFilter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class='container-item d-flex p-2'>
        <Navbar expand='sm' sticky='top' variant='dark'>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav className='list'>
              <h4>Stores</h4>
              <i>(Defult is all stores)</i>
              <ul>
              {this.props.stores?.map(store => ( 
                <li>
                <div class='list-item'>
                  <input type='checkbox' onChange={ this.props.handleChange } value={ store.storeID }></input>
                  <img alt='store' class='icon' src={'https://www.cheapshark.com'+ store.images.icon}/>
                  <span class='text'>{store.storeName}</span>
                </div>
                </li>
              ))}
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}


// <Navbar.Collapse className='justify-content-end'>
//           <Nav>
//             {loggedIn ? (
//             <ul className="navbar-nav">
//               <li className="nav-item m-1">
//                 <Link to="/" className="btn btn-link text-secondary">Home</Link>
//               </li>
//               <li className="nav-item m-1">
//                 <Link to='/games' className="btn btn-link text-secondary">My Games</Link>
//               </li>
//               <li className="nav-item m-1">
//                 <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>Logout</Link>
//               </li>
//             </ul>
//             ) : (
//             <ul className="navbar-nav">
//               <li className="nav-item m-1">
//                 <Link to="/" className="btn btn-link text-secondary">Home</Link>
//               </li>
//               <li className="nav-item m-1">
//                 <Link to='/login' className="btn btn-link text-secondary">Login</Link>
//               </li>
//               <li className="nav-item m-1">
//                 <Link to="signup" className="btn btn-link text-secondary">Sign Up</Link>
//               </li>
//             </ul>
//             )}
//           </Nav>
//         </Navbar.Collapse>