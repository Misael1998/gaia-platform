import React from "react";
import Route from "../../modules/Route";
import Shipping from "../Main/Shipping";
import Cartg from "./components/Cartg";
import { Switch } from "react-router-dom";
import ConfirmRequest from './ConfirmRequest'


const Cart = ({ match }) => {


  return (
    <div className="row">
      <div className="col-12">
        <Switch>
          <Route exact path={`${match.path}`} component={Cartg} isPrivate />
          <Route exact path={`${match.path}/shipping`} component={Shipping} isPrivate />
          <Route path={`${match.path}/confirm`} component={ConfirmRequest} isPrivate/>
        </Switch>
      </div>
    </div>



  );
};



export default Cart;
