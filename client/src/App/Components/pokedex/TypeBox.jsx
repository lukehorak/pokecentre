import React, { Component } from 'react';
import { capitalize } from '../../scripts/pokedexlib'

class TypeBox extends Component {
  
  render() {

    return (
      <span className={`entry-type ${this.props.type}`}>{capitalize(this.props.type)}</span>
    )
  }
}

export default TypeBox;

