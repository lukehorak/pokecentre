import React, { Component } from 'react';
import TypeBox from './TypeBox';

class TypeList extends Component {
  
  render() {

    const types = this.props.types.map(type => <TypeBox type={type} key={`${type}-${this.props.species}`}/>);

    return (
          <div className="type-list">
            {types}
          </div>
    )
  }
}

export default TypeList;
