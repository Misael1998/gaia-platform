import React from 'react'
import {
    MdHome,
    MdShoppingBasket,
    MdExitToApp,
    MdAddShoppingCart
} from "react-icons/md";


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

export default items;