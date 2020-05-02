import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Route from "../../modules/Route";
import items from "../../constants/adminNavigation";
import FormRegEmp from "./FormEmployee/components/FormRegEmp";
import FormProduct from "./FormProduct/FormProduct";
import ProductList from "./ProductList/ProductList";
import FormProvider from './FormProvider/FormProvider';

import Title from "../../components/Title";

import { FaUserAlt } from "react-icons/fa";

import { welcomeMessage } from "../../modules/helper";

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
          component={ProductList}
          isPrivate
        />

        <div className="row p-5">
          <Title title="Bienvenido a PYFLOR" icon={<FaUserAlt size={40} />} />

          <div className="col-12">
            <div className="row">
              <div className="col-12 font-weight-bold text-center mb-3">
                <p className="font-xl">{welcomeMessage()}</p>

                <p className="font-xl">
                  ¡Bienvenido {sessionStorage.getItem("uName")}!
                </p>
              </div>

              <div className="col-lg-12 col-md-12 text-center p-2">
                <img
                  src={require("../../assets/img/header.jpg")}
                  alt="Tienda"
                  className="img-fluid div-radius"
                />
              </div>
            </div>
          </div>
        </div>
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
