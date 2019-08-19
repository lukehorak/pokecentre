import React, { Component } from 'react';
import '../styles/ResultBox.css';
import '../styles/teamBox.css';
import Dome from '../assets/Dome.png';
import Helix from '../assets/Helix.png';

// TODO - team-info score by prop?

class TeamBox extends Component {
  
  render() {
    let class_name = "TeamBox";
    let team_logo_class = "team-logo";
    let team_info_class = "team-info";
    let team_score_class = "team-score";
    let team_logo = Helix;

    if (this.props.side === "right"){
      class_name += " TeamBox-right"
      team_logo_class += " team-logo-right"
      team_info_class += " team-info-right"
      team_score_class += " team-score-right"
      team_logo = Dome;
    }
    return (
      <div className={class_name}>
        <div className={team_logo_class}>
          <img
          //src={this.props.source}
          className="logo-image"
          src={team_logo} // placeholder source
          alt="logo"
          />
        </div>
        <div className={team_info_class}>
          <span>{this.props.team_name}</span>
        </div>
        <div className={team_score_class}>
          <span>{this.props.score}</span>
        </div>
      </div>
    );
  }
}

export default TeamBox;
