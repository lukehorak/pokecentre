import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Graph extends Component {

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
        colors: [
          this.getColor(hp),
          this.getColor(speed),
          this.getColor(attack),
          this.getColor(defense),
          this.getColor(special_attack),
          this.getColor(special_defense)
        ],
        xaxis: {
          categories: ["HP", "Speed", "Attack", "Defense", "Special Attack", "Special Defense"],
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
          }
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

    return (
            <Chart className={"stat-chart"}
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="450"
            />
    )
  }
}

export default Graph;

