import React, { Component } from 'react';
import Pikachu from '../../assets/pikachu.gif';


class Loading extends Component {

  render() {

    return (
      <div>
        <img src={Pikachu} alt="loading..." />
        <h2>{this.props.loadingText}</h2>
      </div>
    )
  }
}

export default Loading;

