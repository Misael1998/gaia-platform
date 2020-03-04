import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Route from "../../modules/Route";
import Inventory from "../Portal/InventoryTable/Inventory";
import items from "../../constants/portalNavigation";

const Portal = ({ match }) => {
  return (
    <div className="row">
      <div className="col-2 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10">
        <Route path={`${match.path}/inventory`} component={Inventory} />
      </div>
    </div>
  );
};

export default Portal;
