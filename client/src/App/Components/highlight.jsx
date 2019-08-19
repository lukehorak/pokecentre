import React, { Component } from 'react';
import '../styles/ResultBox.css';
import '../styles/teamBox.css';
import '../styles/highlight.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Highlight extends Component {
  
  render() {
    var class_name = "highlight-box"
    if (this.props.side === "right"){
      class_name += " highlight-box-right"
    }
    return (
      <div className={class_name}>
        <table className="highlight-list">
          <tbody>
            <tr>
              <th key="name-th">Name</th>
              <th key="kills-th">Kills</th>
              <th key="assists-th">Assists</th>
              <th key="survived-th">Survived</th>
            </tr>
            {this.props.highlights.map(highlight => {
              let isAlive;
              highlight.isAlive ? isAlive = 'check' : isAlive = 'times-circle';
              return(
                <tr key={`${highlight.name}`}>
                  <td>{highlight.name}</td>
                  <td>{highlight.kills}</td>
                  <td>{highlight.assists}</td>
                  <td><FontAwesomeIcon icon={isAlive}/></td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Highlight;
