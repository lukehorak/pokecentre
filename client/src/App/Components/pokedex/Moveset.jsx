import React, { Component } from 'react';
import TypeBox from './TypeBox';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { capitalize } from '../../scripts/pokedexlib';

// TODO - format this!

class Moveset extends Component {
  
  render() {
    const columns = [
      {
        Header: "Move",
        accessor: "move",
        style: {
          textAlign: "center"
        },
        Cell: ({row}) => (capitalize(row.move))
      },
      {
        Header: "Type",
        accessor: "type",
        style: {
          textAlign: "center"
        },
        Cell: ({row}) => (<TypeBox type={row.type}/>)
      },
      {
        Header: "Damage Class",
        accessor: "damage_class",
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "Power",
        accessor: "power",
        style: {
          textAlign: "center"
        },
        Cell: ({row}) => (row.power ? row.power : "N/A")
      },
      {
        Header: "Accuracy",
        accessor: "accuracy",
        style: {
          textAlign: "center"
        },
        Cell: ({row}) => (row.power ? row.accuracy : "N/A")
      },
      {
        Header: "Priority",
        accessor: "priority",
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "PP",
        accessor: "pp",
        style: {
          textAlign: "center"
        },
      }
    ]

    return (
      <ReactTable
        data={this.props.moveList}
        columns={columns}
        defaultPageSize={this.props.moveCount}
        style={{
          height: "25rem" // This will force the table body to overflow and scroll, since there is not enough room
        }}
      />
    )
  }
}

export default Moveset;

