import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import { capitalize } from '../../scripts/pokedexlib'


class Entry extends Component {
  
  render() {

    return (
      <div className="pokedex-entry">
        <Sprite url={this.props.url}/>
        <div className="entry-right-side">
          <h1 className="entry-name">{capitalize(this.props.species)}</h1>
          <TypeList types={this.props.types} species={this.props.species}/>
        </div>
      </div>
    )
  }
}

export default Entry;
