import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import { capitalize } from '../../scripts/pokedexlib';
import Chart from 'react-apexcharts';


class Modal extends Component {
  
  render() {

    const { sprite, species, hp, speed, attack, defense, special_attack, special_defense } = this.props.pokemon;
    const types = [this.props.pokemon.type1];
    if(this.props.pokemon.type2) {
      types.push(this.props.pokemon.type2);
    }

    return (
      <div className="pokedex-modal" onClick={this.props.hideModal}>
        <div className="pokedex-entry modal-main">
          <Sprite url={sprite}/>
          <div className="entry-right-side">
            <h1 className="entry-name">{capitalize(species)}</h1>
            <TypeList types={types} species={species}/>
            <ul>
              <li>HP: {hp}</li>
              <li>Speed: {speed}</li>
              <li>Attack: {attack}</li>
              <li>Defense: {defense}</li>
              <li>Special Attack: {special_attack}</li>
              <li>Special Defense: {special_defense}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;



  // constructor(props){
  //   super(props);
  //   this.state = {
  //     options: {
  //       chart: {
  //         id: "basic-bar"
  //       },
  //       xaxis: {
  //         categories: ['hp', 'speed', 'attack', 'defense', 'special attack', 'special defense']
  //       }
  //     },
  //     series: [
  //       {
  //         name: "series-1",
  //         data: [50, 50, 50, 50, 50, 50],
  //       }
  //     ]
  //   };
  // }

  {/* <Chart 
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="500"
        /> */}