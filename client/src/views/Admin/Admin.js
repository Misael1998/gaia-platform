import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Route from "../../modules/Route";
import items from "../../constants/adminNavigation";
import FormRegEmp from "./FormEmployee/components/FormRegEmp";
import FormProduct from "./FormProduct/FormProduct";
import FormProvider from './FormProvider/FormProvider';

const Portal = ({ match }) => {
  return (
    <div className="row">
      <div className="col-2 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10 p-0">
        <Route
          path={`${match.path}/formulario-empleado`}
          component={FormRegEmp}
          isPrivate
        />
        <Route
          path={`${match.path}/formulario-productos`}
          component={FormProduct}
          isPrivate
        />
        <Route
          path={`${match.path}/formulario-proveedores`}
          component={FormProvider}
          isPrivate
        />
      </div>
    </div>
  );
};

export default Portal;
