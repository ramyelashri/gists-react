import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';

class App extends Component {

  render() {
    return (
        <div>
            <div className="appBar">Github Gists</div>
            <SearchForm />
        </div>
    );
  }
}

export default App;
