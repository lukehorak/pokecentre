import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';
import Graph from './Graph';
import Moveset from './Moveset';
import { capitalize } from '../../scripts/pokedexlib';
import Loading from './Loading';


/*
TODO - try moving the data processing server-side for performance (sending less data to client)
Steps:

0. Rename testMove to something getMoves      CHECK
1. move getAllMoves to api call               CHECK
2. move the processing to api call            CHECK
3. return post-processed data from endpoint   CHECK
4. fill data in components from endpoint      CHECK

*/
import getAllMoves from '../../scripts/getMoves'

// TODO - optimize this! its super slow

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = { moveList: null }
  }
  
  componentDidMount(){
    getAllMoves(this.props.pokemon.species)
    .then(data => this.setState({moveList: data}))
  }

  componentWillUnmount(){
    this.setState({moveList: null})
  }
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
              {!this.state.moveList && <Loading className="loading-gif" loadingText="Loading moveset..."/>}
              {this.state.moveList && <Moveset moveList={this.state.moveList} moveCount={this.state.moveList.length}/> }
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Modal;

