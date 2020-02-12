import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
