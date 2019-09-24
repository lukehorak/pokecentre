import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import { capitalize } from '../../scripts/pokedexlib';


// TODO - bar chart colours
import Chart from 'react-apexcharts';

class Modal extends Component {

  getColor = (value) => {
    if (value > 120){
      return "#75B200";
    }
    if (value > 100){
      return "#DDD75A";
    }
    if (value > 80){
      return "#F8BC4C"
    }
    return "#E56565";
  }

  constructor(props) {
    super(props);

    const { hp, speed, attack, defense, special_attack, special_defense } = this.props.pokemon;

    this.state = {
      options: {
        chart: {
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 900,
            animateGradually: {
                enabled: true,
                delay: 450
            },
            dynamicAnimation: {
              enabled: true,
              speed: 800
          }
        }
        },
        xaxis: {
          categories: ["hp", "speed", "attack", "defense", "special attack", "special defense"]
        }
      },
      plotOptions: {
        bar: {
          barHeight: '90%',
          distributed: true,
          horizontal: true,
          colors: {
            ranges: [{ from: 0, to: 79, color: "#75B200"},
              { from: 80, to: 99, color: "#DDD75A"},
              { from: 100, to: 119, color: "#F8BC4C"},
              { from: 120, to: 500, color: "#E56565"},
            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1
          },
        }
      },
      //colors: [this.getColor(hp), this.getColor(speed), this.getColor(attack), this.getColor(defense), this.getColor(special_attack), this.getColor(special_defense)],
      title: {
        text: 'Base Stats',
        align: 'center',
        floating: true
      },
      series: [
        {
          data: [hp, speed, attack, defense, special_attack, special_defense]
        }
      ]
      
    };
  }

  componentDidMount () {
  }
  
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
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
              colors={[this.getColor(hp), this.getColor(speed), this.getColor(attack), this.getColor(defense), this.getColor(special_attack), this.getColor(special_defense)]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;

