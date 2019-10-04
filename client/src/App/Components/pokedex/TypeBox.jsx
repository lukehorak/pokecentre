import React, { Component } from 'react';
import { capitalize } from '../../scripts/pokedexlib'

// TODO - make these fixed width

class TypeBox extends Component {
  
  render() {

    return (
      <span className={`entry-type ${this.props.type}`}>{capitalize(this.props.type)}</span>
    )
  }
}

export default TypeBox;

