import React, { Component } from 'react';

const capitalize = (word) => {
  const firstLetter = word[0].toUpperCase();
  return `${firstLetter}${word.slice(1,)}`
}

class TypeBox extends Component {
  
  render() {

    return (
      <span className={`entry-type ${this.props.type}`}>{capitalize(this.props.type)}</span>
    )
  }
}

export default TypeBox;

