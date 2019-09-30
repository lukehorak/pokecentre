import React, { Component } from 'react';
import Entry from '../Components/pokedex/Entry';
import Navbar from '../Components/pokedex/Navbar';
import Modal from '../Components/pokedex/Modal';
import '../styles/pokedex.css';



class Pokedex extends Component {

  constructor(props){
    super(props);
    this.state = {
      pokemon: null,
      showDeets: false,
      modalMon: null
    }
  }

  componentDidMount() {
    fetch('/api/pokedex')
      .then(response => response.json())
      .then(data => {
        this.setState({ pokemon: data })
      })
  }

  showModal = (pokemon) => {
    this.setState({ showDeets: true , modalMon: pokemon});
  };

  hideModal = () => {
    this.setState({ showDeets: false, modalMon: null});
  };

  render(){
    const mons = [];
    if (this.state.pokemon){
      for (let mon of this.state.pokemon){
        mons.push(<Entry pokemon={mon} key={mon.number} showModal={this.showModal} />)
      }
    }
    return(
      <>
        <Navbar />
        {this.state.showDeets && <Modal pokemon={this.state.modalMon} hideModal={this.hideModal}/>}
        <div className="entry-list">
          {mons}
        </div>
      </>
    )
  }

}

export default Pokedex;