import React from "react";
import { MdHome, MdExitToApp } from "react-icons/md";
import { logout } from "../modules/helper";
import { IoIosPerson } from "react-icons/io";

const items = [
  {
    name: "home",
    label: "Inicio",
    icon: <MdHome size={30} />,
    link: "/portal"
  },
  {
    name: "employees",
    label: "Empleados",
    icon: <IoIosPerson size={30} />,
    link: "/admin/formEmp"
  },
  {
    name: "logout",
    label: "Cerrar sesion",
    icon: <MdExitToApp size={30} />,
    onClick: logout
  }
];

export default items;
