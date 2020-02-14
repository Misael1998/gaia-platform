import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home/Home";
import LogInPage from "./views/Log-In/LogInPage";
import RecoverPass from "./views/Register/RecoverPass";
import RecoverForm from "./views/Register/RecoverForm";

function App() {
  return (
    <Router>
      <div className="container-fluid p-0">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LogInPage} />
          <Route exact path="/recovery-password" component={RecoverPass} />
          <Route exact path="/recovery-password/form" component={RecoverForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
