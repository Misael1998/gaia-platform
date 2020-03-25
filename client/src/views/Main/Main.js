import React from "react";
import Route from "../../modules/Route";
import items from "../../constants/mainNavigation";
import SideNavbar from "../../components/Layout/SideNavbar";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import Orders from "./Orders";
import { Redirect } from "react-router-dom";
import ShippingDetails from "./components/ShippingDetails";
import SuccessRequest from "./SuccessRequest";
import CancelRequest from "./CancelRequest";

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
        <Route path={`${match.path}/requests`} component={Orders} isPrivate/>
        <Route path={`${match.path}/product/:id`} component={ProductDetail} isPrivate />
        <Route exact path={`${match.path}/request/:id`} component={ShippingDetails} isPrivate/> 
        
        <Route path={`${match.path}/success-request`} component={SuccessRequest} isPrivate/>
        <Route path={`${match.path}/cancel-request`} component={CancelRequest} isPrivate/>
        {/* <Redirect to={`${match.path}/products`} /> */}
      </div>
    </div>
  );
};

export default Main;
