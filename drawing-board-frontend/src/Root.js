import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Drawings from './Drawings';
import Drawing from './Drawing';
import Header from './Header';
import Connection from './Connection';

const Root = () => (
  <div className="App">
    <Router>
      <Header />
      <div className="App-contents">
        <Connection />
        <Switch>
          <Route path="/" component={Drawings} exact />
          <Route path="/drawing" component={Drawing} exact />
        </Switch>
      </div>
    </Router>
  </div>
);

export default Root;
