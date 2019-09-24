import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import { capitalize } from '../../scripts/pokedexlib';

class Entry extends Component {

  showThisModal = () => {
    this.props.showModal(this.props.pokemon)
  }

  render() {

    const { sprite, species } = this.props.pokemon;
    const types = [this.props.pokemon.type1];
    if(this.props.pokemon.type2) {
      types.push(this.props.pokemon.type2);
    }

    return (
      <div className="pokedex-entry pokedex-entry-main" onClick={this.showThisModal}>
        <Sprite url={sprite}/>
        <div className="entry-right-side">
          <h1 className="entry-name">{capitalize(species)}</h1>
          <TypeList types={types} species={species}/>
        </div>
      </div>
    )
  }
}

export default Entry;
