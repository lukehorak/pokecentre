import React, { Component } from 'react';


class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      results: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getData();
  }

  // Retrieves the list of items from the Express app
  getData = () => {
    fetch('/api/TestData')
    .then(res => res.json())
    .then(results => this.setState({ results }))
  }

  render() {
    const { results } = this.state;

    return (
      <div className="App">
        <h1>json-ed results</h1>
        {JSON.stringify(results)}
        
      </div>
    );
  }
}

export default List;
