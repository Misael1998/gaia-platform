
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './views/Home/Home';
import LogInPage from "./views/Log-In/LogInPage";
import RecoverPass from './views/Register/RecoverPass';
import RecoverForm from './views/Register/RecoverForm';
import RegUser from './views/FormRegUs/RegUser'
import catProducts from './views/CatProducts/catProducts'
import Main from './views/Main/Main';
import SessionStorageService from './services/Storage';





function App() {

  const token = SessionStorageService.getToken();


  return (
    <Router>
      {token ? <Redirect from="/" to='/app' /> : null}
      <div className="container-fluid p-0">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/app" component={Main} />
          <Route exact path="/login" component={LogInPage} />
          <Route exact path="/register" component={RegUser} />
          <Route exact path="/cat-products" component={catProducts} />
          <Route exact path="/recovery-password" component={RecoverPass} />
          <Route exact path="/recovery-password/form" component={RecoverForm} />
        </Switch>
      </div>
    </Router>
  );


}

export default App;
