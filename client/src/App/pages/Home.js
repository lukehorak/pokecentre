import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div className="App">
        <Link to={'./TestData'}>
          <button variant='raised'>
            testData
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;