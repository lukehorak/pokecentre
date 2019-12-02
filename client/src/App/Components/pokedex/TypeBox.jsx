import React, { Component } from 'react';
import { capitalize } from '../../scripts/pokedexlib'


class TypeBox extends Component {
  
  render() {

    return (
      <div className={`entry-type ${this.props.type}`}>
        <span>{capitalize(this.props.type)}</span>
      </div>
    )
  }
}

export default TypeBox;

