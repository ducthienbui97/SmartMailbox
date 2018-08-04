import React, { Component } from 'react';
import './App.css';

import Sidebar from './component/Sidebar';
import InviteMember from './component/InviteMember';

class App extends Component {
  render() {
    return (
      <div>
        <InviteMember />
      </div>
    );
  }
}

export default App;
