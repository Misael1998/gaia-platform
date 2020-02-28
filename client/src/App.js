
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'react-router-dom'
import Routes from './modules/Routes';
import history from './services/history'



function App() {

  return (
    <Router history={history}>
      <div className="container-fluid p-0">
        <Routes />
      </div>
    </Router>
  );


}

export default App;
