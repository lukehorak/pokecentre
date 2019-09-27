import React, { Component } from 'react';
import TypeBox from './TypeBox';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { capitalize } from '../../scripts/pokedexlib';

// TODO - Actually populate this data

class Moveset extends Component {

  
  render() {
    const columns = [
      {
        Header: "Move",
        accessor: "move",
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "Type",
        accessor: "type",
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "Category",
        accessor: "category",
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "Learned Via",
        accessor: "learned_by",
        style: {
          textAlign: "center"
        },
      }
    ]

    const demoData = [
      {
        move: "Scratch",
        type: <TypeBox type="normal" />,
        category: "Physical",
        learned_by: "level"
      },
      {
        move: "Dragon Dance",
        type: <TypeBox type="dragon"/>,
        category: "Status",
        learned_by: "egg"
      },
      {
        move: "Ember",
        type: <TypeBox type="fire"/>,
        category: "Special",
        learned_by: "level"
      },
    ]


    return (
      <ReactTable
        data={demoData}
        columns={columns}
        style={{
          height: "25rem" // This will force the table body to overflow and scroll, since there is not enough room
        }}
      />
    )
  }
}

export default Moveset;

