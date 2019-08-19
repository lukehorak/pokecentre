import React, { Component } from 'react';
import Sprite from './Sprite';

class Entry extends Component {
  
  render() {

    return (
      <div className="pokedex-entry">
        <h1>{this.props.species}</h1>
        <Sprite url={this.props.url}/>
      </div>
    )
  }
}

export default Entry;
