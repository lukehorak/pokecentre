import React, { Component } from 'react';

class Sprite extends Component {
  
  render() {

    return (
      <img className ="sprite" src={this.props.url} alt="test"/>
    )
  }
}

export default Sprite;
