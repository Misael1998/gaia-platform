import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./modules/Routes";
import history from "./services/history";

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="container-fluid p-0">
          <Routes />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
