import React from "react";
import { MdHome, MdExitToApp } from "react-icons/md";
import { logout } from "../modules/helper";
import { IoIosPerson } from "react-icons/io";
import { FiPackage } from "react-icons/fi";

const items = [
  {
    name: "home",
    label: "Inicio",
    icon: <MdHome size={30} />,
    link: "/admin",
  },
  {
    name: "employees",
    label: "Empleados",
    icon: <IoIosPerson size={30} />,
    link: "/admin/formEmp",
  },
  {
    name: "products",
    label: "Productos",
    icon: <FiPackage size={30} />,
    link: "/admin/formProduct",
  },
  {
    name: "logout",
    label: "Cerrar sesion",
    icon: <MdExitToApp size={30} />,
    onClick: logout,
  },
];

export default items;
