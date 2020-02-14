import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home/Home";
import LogInPage from "./views/Log-In/LogInPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LogInPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
