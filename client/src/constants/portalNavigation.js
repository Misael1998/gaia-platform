import React from "react";
import {
  MdHome,
  MdShoppingBasket,
  MdExitToApp,
  MdAddShoppingCart
} from "react-icons/md";
import { GoPackage } from "react-icons/go";
import {logout} from '../modules/helper'

const items = [
  {
    name: "home",
    label: "Inicio",
    icon: <MdHome size={30} />,
    link: "/portal"
  },
  {
    name: "purchases",
    label: "Añadir compra",
    icon: <MdShoppingBasket size={30} />,
    // subitems: [
    //   {
    //     name: "addPurchase",
    //     label: "Añadir solicitud",
    //     icon: <MdAddShoppingCart size={30} />,
    //     link: "/portal/purchase-request"
    //   }
    // ],
    link: "/portal/purchases-request"
  },
  {
    name: "inventory",
    label: "Inventario",
    icon: <GoPackage size={30} />,
    link: "/portal/inventory"
  },
  { name: 'logout', label: 'Cerrar sesion', icon: <MdExitToApp size={30} />, onClick: logout }
];

export default items;
