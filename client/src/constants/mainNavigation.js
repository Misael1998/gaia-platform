
import React from 'react'
import { MdHome, MdShoppingCart, MdPerson, MdExitToApp } from 'react-icons/md'
import { IoMdCalendar } from 'react-icons/io'
import { logout } from '../modules/helper'

export default [
    { name: 'home', label: 'Inicio', icon: <MdHome size={30} />, link: '/app/products' },
    { name: 'cart', label: 'Carrito', icon: <MdShoppingCart size={30} />, link: '/app/cart' },
    { name: 'orders', label: 'Pedidos', icon: <IoMdCalendar size={30} />, link: '/app/orders' },
    // { name: 'user', label: 'Perfil', icon: <MdPerson size={30} />, link: '/app/profile' },
    { name: 'logout', label: 'Cerrar sesion', icon: <MdExitToApp size={30} />, onClick: logout }
]