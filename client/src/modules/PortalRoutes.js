import React from 'react';
import Route from './Route'
import { Switch } from 'react-router-dom'

const PortalRoutes = () => {
    return (
        <Switch>
              <Route exact path='/portal/purchases/add'/>
              <Route exact path='/portal/purchases'/>
        </Switch>
    );
};

export default PortalRoutes;