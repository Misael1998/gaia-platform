import React from 'react';
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom'
import SessionStorageService from '../../services/Storage';
import SideNavbar from '../../components/Layout/SideNavbar'
import {MdHome, MdShoppingCart, MdPerson, MdExitToApp, } from 'react-icons/md'
import {IoMdCalendar } from 'react-icons/io'


const Main = () => {

    const items = [
        {name: 'home', label: 'Inicio', icon: <MdHome size={30}/>},
        {name: 'cart', label: 'Carrito', icon: <MdShoppingCart size={30}/> },
        {name: 'orders', label: 'Ordenes', icon: <IoMdCalendar size={30}/>},
        {name: 'user', label: 'Perfil', icon:<MdPerson size={30}/>},
        {name: 'logout', label: 'Cerrar sesion', icon: <MdExitToApp size={30}/>}
    ]
    const token = SessionStorageService.getToken();

    return (
        <>
            {/* {token === null ? <Redirect exact from='/app' to='/' /> : null} */}
            <Router>
                <SideNavbar items={items}/>
               
                <Switch>

                </Switch>
            </Router>
        </>
    );
};

export default Main;