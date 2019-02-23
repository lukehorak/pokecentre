import React, { Component } from 'react';
import ResultBox from '../Components/ResultBox';
import Uploader from '../Components/Uploader';
import logo from '../assets/PoKeLiTiCs.png';
import '../styles/PokeCentre.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck)
library.add(faTimesCircle)

class PokeCentre extends Component {

  constructor(props){
    super(props);
    this.state = { results:[]}
  }
  
  getResult = (resultValue) => {
    let resultObj = JSON.parse(resultValue)
    this.setState({ results: resultObj });
  }
  
  render() {
    return (
      <div className="App">
        <img src={logo} alt="Title"/>
        <div className="upload-box-hidden">
          <Uploader getResult={this.getResult}/>
        </div>
        <div className="result-box">
          <ResultBox results={this.state.results}/>
        </div>
      </div>
    );
  }
}

export default PokeCentre;