import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Route from "../../modules/Route";
import items from "../../constants/adminNavigation";
import FormRegEmp from "./FormEmployee/components/FormRegEmp";
import FormProduct from "./FormProduct/FormProduct";

const Portal = ({ match }) => {
  return (
    <div className="row">
      <div className="col-2 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10 p-0">
        <Route
          path={`${match.path}/formEmp`}
          component={FormRegEmp}
          isPrivate
        />
        <Route
          path={`${match.path}/formProduct`}
          component={FormProduct}
          isPrivate
        />
      </div>
    </div>
  );
};

export default Portal;
