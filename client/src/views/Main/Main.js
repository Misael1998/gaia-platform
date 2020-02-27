import React from 'react';
import SessionStorageService from '../../services/Storage';
import SideNavbar from '../../components/Layout/SideNavbar'
import {MdHome, MdShoppingCart, MdPerson, MdExitToApp, } from 'react-icons/md'
import {IoMdCalendar } from 'react-icons/io'


const Main = () => {

    const items = [
        {name: 'home', label: 'Inicio', icon: <MdHome size={30}/>, link: '/app'},
        {name: 'cart', label: 'Carrito', icon: <MdShoppingCart size={30}/>, link: '/app/cart' },
        {name: 'orders', label: 'Ordenes', icon: <IoMdCalendar size={30}/>, link: '/app/orders'},
        {name: 'user', label: 'Perfil', icon:<MdPerson size={30}/>, link: '/app/profile'},
        {name: 'logout', label: 'Cerrar sesion', icon: <MdExitToApp size={30}/>,link: '/'}
    ]
    const token = SessionStorageService.getToken();

    return (
        <>
            {/* {token === null ? <Redirect exact from='/app' to='/' /> : null} */}
            <div>
                <SideNavbar items={items}/>
            </div>
        </>
    );
};

export default Main;