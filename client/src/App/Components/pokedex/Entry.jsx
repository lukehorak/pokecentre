import React, { Component } from 'react';
import TypeList from './Types';
import Sprite from './Sprite';

class Entry extends Component {
  
  render() {

    return (
      <div className="pokedex-entry">
        <Sprite url={this.props.url}/>
        <div className="entry-right-side">
          <h1 className="entry-name">{this.props.species}</h1>
          <TypeList types={this.props.types} species={this.props.species}/>
        </div>
      </div>
    )
  }
}

export default Entry;
