import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import TestData from './pages/TestData';
import PokeCentre from './pages/PokeCentre';
import Pokedex from './pages/Pokedex'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={PokeCentre}/>
          <Route exact path="/pokedex" component={Pokedex}/>
          <Route exact path="/testData" component={TestData}/>
          <Route exact pat="/pc" component = {Home} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
