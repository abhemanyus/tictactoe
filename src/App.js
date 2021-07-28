import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"good": "Fine."};
  }
  onClick = (extra) => {
    console.log(this.state.good);
    console.log(extra);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        <button style={{"margin": "1em", 
                        "padding": "1em", 
                        "color": "red", 
                        "backgroundColor": "black", 
                        "fontSize": "large",
                        "border": "none"}} 
                        onClick={this.onClick.bind(this, "hohoho")}>This</button>
        </header>
      </div>
    );
  }
}

export default App;
