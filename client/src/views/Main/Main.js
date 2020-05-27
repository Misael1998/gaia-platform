import React from "react";
import Route from "../../modules/Route";
import items from "../../constants/mainNavigation";
import SideNavbar from "../../components/Layout/SideNavbar";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import Orders from "./Orders";
import ShippingDetails from "./components/ShippingDetails";
import SuccessRequest from "./SuccessRequest";
import CancelRequest from "./CancelRequest";
import Profile from "./Profile/Profile";
import ReOrder from "./ReOrder";
import Home from './components/Home'

const Main = ({ match }) => {



  return (
    <div className="row">
      <div className=" col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10">

        {/* Configuración de rutas */}
        <Route exact path={`${match.path}/`} component={Home} isPrivate />
        <Route path={`${match.path}/orders`} isPrivate />
        <Route path={`${match.path}/profile`} isPrivate />
        <Route path={`${match.path}/cart`} component={Cart} isPrivate />
        <Route path={`${match.path}/products`} component={Products} isPrivate />
        <Route path={`${match.path}/requests`} component={Orders} isPrivate />
        <Route path={`${match.path}/product/:id`} component={ProductDetail} isPrivate />
        <Route exact path={`${match.path}/request/:id`} component={ShippingDetails} isPrivate />
        <Route exact path={`${match.path}/request/reorder/:id`} component={ReOrder} isPrivate />
        <Route path={`${match.path}/success-request`} component={SuccessRequest} isPrivate />
        <Route path={`${match.path}/cancel-request`} component={CancelRequest} isPrivate />
        <Route path={`${match.path}/profile`} component={Profile} isPrivate />

       
      </div>
    </div>
  );
};

export default Main;
