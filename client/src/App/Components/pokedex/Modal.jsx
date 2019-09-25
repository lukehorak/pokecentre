import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import { capitalize } from '../../scripts/pokedexlib';


// TODO - bar chart colours
import Chart from 'react-apexcharts';

class Modal extends Component {

  getColor = (value) => {
    if (value > 140){
      return "#28E2AA"
    }
    if (value > 100){
      return "#75B200";
    }
    if (value > 90){
      return "#a9dd5a";
    }
    if (value > 60){
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
        colors: [this.getColor(hp), this.getColor(speed), this.getColor(attack), this.getColor(defense), this.getColor(special_attack), this.getColor(special_defense)],
        xaxis: {
          categories: ["hp", "speed", "attack", "defense", "special attack", "special defense"],
          labels: {
            show: true,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              cssClass: 'apexcharts-xaxis-label',
          },
          }
        },
        yaxis: {
          forceNiceScale: false,
          min: 0,
          max: 260
        },
        plotOptions: {
          bar: {
            barHeight: '90%',
            distributed: true,
            horizontal: true,
          },
        },
        title: {
          text: 'Base Stats',
          align: 'center',
          floating: true
        },
      },
      series: [
        {
          data: [hp, speed, attack, defense, special_attack, special_defense]
        }
      ]
    }
  };
  
  render() {

    const { sprite, species } = this.props.pokemon;
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
            <Chart className={"stat-chart"}
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="450"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;

