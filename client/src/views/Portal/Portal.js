import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Route from "../../modules/Route";
import Inventory from "../Portal/InventoryTable/Inventory";
import Request from "./FormRequest/Request";
import items from "../../constants/portalNavigation";
import Referrals from "./Referrals/Referrals";

const Portal = ({ match }) => {
  return (
    <div className="row">
      <div className="col-2 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10 p-0">
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
      </div>
    </div>
  );
};

export default Portal;
