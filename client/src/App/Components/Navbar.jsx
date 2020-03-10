import React, { Component } from 'react';
import logo from '../assets/PoKeLiTiCs.png';

class Sprite extends Component {
  
  render() {

    return (
      <div className="nav">
        <img className="title-image" src={logo} alt="Title"/> 
      </div>
    )
  }
}

export default Sprite;
