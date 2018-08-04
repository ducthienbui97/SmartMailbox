import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory                          from "history/createBrowserHistory"
import logo from './logo.svg';
import './App.css';
import './component/css/content.css';

import Sidebar from './component/Sidebar';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        {/*<div className="App">*/}
        {/*<Sidebar />*/}
        {/*<header className="App-header">*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
        {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<Button>Hello wolrld</Button>*/}
        {/*</div>*/}
        <Route path="/" component={Sidebar}/>
      </Router>
    );
  }
}

export default App;
