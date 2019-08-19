import React, { Component } from 'react';
import Entry from '../Components/pokedex/Entry'
import '../styles/pokedex.css';


class Pokedex extends Component {

  constructor(props){
    super(props);
    this.state = {
      pokemon: null
    }
  }

  componentDidMount() {
    fetch('/api/pokedex')
      .then(response => response.json())
      .then(data => {
        this.setState({ pokemon: data })
      })
  }

  render(){
    const mons = [];
    if (this.state.pokemon){
      for (let mon of this.state.pokemon){
        mons.push(<Entry species={mon.species} url={mon.sprite} key={mon.number}/>)
      }
    }
    return(
      <>
        {mons}
      </>
    )
  }

}

export default Pokedex;