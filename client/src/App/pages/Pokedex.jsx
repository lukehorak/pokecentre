import React, { Component } from 'react';
import Entry from '../Components/pokedex/Entry';
import Navbar from '../Components/pokedex/Navbar';
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
        mons.push(<Entry species={mon.species} url={mon.sprite} types={mon.types} key={mon.number}/>)
      }
    }
    return(
      <>
        <Navbar />
        <div className="entry-list">
          {mons}
        </div>
      </>
    )
  }

}

export default Pokedex;