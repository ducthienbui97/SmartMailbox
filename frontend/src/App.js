import React, { Component } from 'react';
import { Button } from 'antd';
import logo from './logo.svg';
import './App.css';

import Sidebar from './component/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
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
        <Sidebar/>
      </div>
    );
  }
}

export default App;
