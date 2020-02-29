import React from "react";
import SideNavbar from "../../components/Layout/SideNavbar";
import Request from "./FormRequest/Request";
import Route from "../../modules/Route";

import {
  MdHome,
  MdShoppingBasket,
  MdExitToApp,
  MdAddShoppingCart
} from "react-icons/md";

const Portal = ({ match }) => {
  const items = [
    {
      name: "home",
      label: "Inicio",
      icon: <MdHome size={30} />,
      link: "/portal"
    },
    {
      name: "purchases",
      label: "Compras",
      icon: <MdShoppingBasket size={30} />,
      subitems: [
        {
          name: "addPurchase",
          label: "Añadir solicitud",
          icon: <MdAddShoppingCart size={30} />,
          link: "/portal/purchases/add"
        }
      ],
      link: "/portal/purchases"
    },
    { name: "exit", label: "Cerrar sesión", icon: <MdExitToApp size={30} /> }
  ];

  return (
    <div className="row">
      <div className="col-2 p-r-0 bg-gray">
        <SideNavbar items={items} />
      </div>
      <div className="col-10 p-0">
        <Route path={`${match.path}/purchase-request`} component={Request} />
      </div>
    </div>
  );
};

export default Portal;
