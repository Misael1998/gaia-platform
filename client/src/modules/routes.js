import React from 'react';
import { Switch } from 'react-router-dom'
import Route from './Route'
import Home from '../views/Home/Home';
import LogInPage from "../views/Log-In/LogInPage";
import RecoverPass from '../views/Register/RecoverPass';
import RecoverForm from '../views/Register/RecoverForm';
import RegUser from '../views/FormRegUs/RegUser'
import Main from '../views/Main/Main';
import Portal from '../views/Portal/Portal';



const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/app" component={Main} />
                <Route path="/portal" component={Portal} />
                <Route exact path="/login" component={LogInPage} />
                <Route exact path="/register" component={RegUser} />
                <Route exact path="/recovery-password" component={RecoverPass} />
                <Route exact path="/recovery-password/form" component={RecoverForm} />
            </Switch>
        </>
    );
};

export default Routes;