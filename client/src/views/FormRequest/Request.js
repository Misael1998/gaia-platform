import React, { Fragment } from "react";
import FormRequest from "./components/FormRequest";
import FooterLog from "../../components/Layout/FooterLog";
import SideNavbar from "../../components/Layout/SideNavbar";
import { MdHome, MdShoppingBasket, MdExitToApp } from "react-icons/md";
import "./style/Request.css";

const Request = () => {
  const items = [
    { name: "home", label: "Inicio", icon: <MdHome size={30} /> },

    {
      name: "purchases",
      label: "Compras",
      icon: <MdShoppingBasket size={30} />
    },

    { name: "exit", label: "Cerrar sesión", icon: <MdExitToApp size={30} /> }
  ];

  return (
    <Fragment>
      <div className="row lim2">
        <div className="col-lg-3 col-md-2 col-sm-1 sideBar-col">
          <SideNavbar items={items} />
        </div>

        <div className="col-lg-9 col-md-10 col-sm-11 p-0">
          <FormRequest />
        </div>
      </div>
    </Fragment>
  );
};

export default Request;
