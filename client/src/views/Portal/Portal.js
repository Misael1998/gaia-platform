import React from 'react';
import SideNavbar from '../../components/Layout/SideNavbar';
import { MdHome, MdShoppingBasket, MdList, MdExitToApp } from 'react-icons/md';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

const Portal = () => {

    const items = [
        { name: 'home', label: 'Inicio', icon: <MdHome size={30} /> },
        { name: 'purchases', label: 'Compras', icon: <MdShoppingBasket size={30} /> },
        { name: 'exit', label: 'Cerrar sesión', icon: <MdExitToApp size={30} /> }
    ]

    return (
        <Router>
            <SideNavbar items={items} />
            <Switch>

            </Switch>
        </Router>
    );
};

export default Portal;