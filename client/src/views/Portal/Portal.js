import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Route from "../../modules/Route";
import Inventory from "../Portal/InventoryTable/Inventory";
import Request from "./FormRequest/Request";
import items from "../../constants/portalNavigation";
import Referrals from "./Referrals/Referrals";
import RequestTable from "./RequestTable/RequestTable";
import ShippingDetail from "../Main/components/ShippingDetails";
import Bill from "./Bill/Bill";
import MainEmployee from "./MainEmployee/MainEmployee";

const Portal = ({ match }) => {
  return (
    <div className="row">
      <div className="col-lg-2 col-md-1 col-sm-1 col-1 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-11 col-sm-11 col-md-10 col-lg-10 ">
        <Route exact path={`${match.path}`} component={MainEmployee} isPrivate />
        <Route
          path={`${match.path}/inventory`}
          component={Inventory}
          isPrivate
        />
        <Route
          path={`${match.path}/purchases-request`}
          component={Request}
          isPrivate
        />
        <Route
          path={`${match.path}/referrals`}
          component={Referrals}
          isPrivate
        />
        <Route
          path={`${match.path}/requests-summary`}
          component={RequestTable}
          isPrivate
        />
        <Route
          exact
          path={`${match.path}/request-summary/details/:id`}
          component={ShippingDetail}
          isPrivate
        />
        <Route
          exact
          path={`${match.path}/request-summary/details/facturacion/:id`}
          component={Bill}
          isPrivate
        />
      </div>
    </div>
  );
};

export default Portal;
