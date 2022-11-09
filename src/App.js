import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import Header from './components/Header';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      {/* <Header /> */}

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>

    </div>
  );
}
