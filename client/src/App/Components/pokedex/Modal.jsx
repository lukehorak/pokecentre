import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import Graph from './Graph';
import Moveset from './Moveset';
import { capitalize } from '../../scripts/pokedexlib';

class Modal extends Component {
  
  render() {

    const { sprite, species } = this.props.pokemon;
    const types = [this.props.pokemon.type1];
    if(this.props.pokemon.type2) {
      types.push(this.props.pokemon.type2);
    }

    return (
      <div className="pokedex-modal" onClick={this.props.hideModal}>
        <div className="modal-main">
          <div className="modal-entry">

            <div className="modal-top">
              <Sprite url={sprite}/>
              <div className="entry-right-side">
                <h1 className="entry-name">{capitalize(species)}</h1>
                <TypeList types={types} species={species}/>
                <Graph pokemon={this.props.pokemon} />
              </div>
            </div>

            <div className="modal-bottom">
              <Moveset />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Modal;

