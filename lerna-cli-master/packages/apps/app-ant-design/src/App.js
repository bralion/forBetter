import React, { Component } from 'react';
import ReactLogo from './ReactLogo.svg';
import YarnCat from './YarnCat.svg';
import './App.css';

import { DatePicker } from 'antd';

import { CompOne, CompTwo } from '@project/components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src={ReactLogo} className="React-logo" alt="React Logo" />
            <img src={YarnCat} className="Yarn-cat" alt="Yarn Workspaces Cat" />
          </div>
          <h2>Hot Reload Your Workspaces</h2>
          <p className="body">
            <code className="file">packages/apps/app-ant-design/src/App.js</code>
            <code className="file">packages/components/src/CompOne/CompOne.js</code>
            <code className="file">packages/components/src/CompTwo/CompTwo.js</code>
          </p>
          <div className="components">
            <CompOne />
            <CompTwo />
            <DatePicker />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
