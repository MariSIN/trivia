import React from 'react';
import logo from '../trivia.png';
import '../App.css';

class Header extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
      </div>
    );
  }
}

export default Header;
