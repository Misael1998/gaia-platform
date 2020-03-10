import React from "react";
import Route from "../../modules/Route";
import items from "../../constants/mainNavigation";
import SideNavbar from "../../components/Layout/SideNavbar";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import { Redirect } from "react-router-dom";
import ConfirmRequest from "./ConfirmRequest";

const Main = ({ match }) => {
  return (
    <div className="row">
      <div className="col-2 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10">
        <Route path={`${match.path}/orders`} isPrivate />
        <Route path={`${match.path}/profile`} isPrivate />
        <Route path={`${match.path}/cart`} component={Cart} isPrivate />
        <Route path={`${match.path}/products`} component={Products} isPrivate />
        <Route path={`${match.path}/confirm`} component={ConfirmRequest} isPrivate/>
        <Route path={`${match.path}/product/:id`} component={ProductDetail} isPrivate />
        {/* <Redirect to={`${match.path}/products`} /> */}
      </div>
    </div>
  );
};

export default Main;
