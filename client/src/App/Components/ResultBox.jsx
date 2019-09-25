import React, { Component } from 'react';
import '../styles/ResultBox.css';
import TeamBox from './teamBox';
import Highlight from './highlight'
import '../styles/highlight.css'


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="score-container">
          {this.props.results.map((result, index) => {
            let side;
            index === 0 ? side = "left" : side = "right";
              return (
              <TeamBox key={side} side={side} team_name={result.name} score={result.score}/>
              )
            }
            )}
        </div>
        <div className="highlight-container">
          {this.props.results.map((result, index) => {
            let side;
            index === 0 ? side = "left" : side = "right";
            return (
              <Highlight key={`highlight-${side}`} side={side} highlights={result.highlights}/>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
