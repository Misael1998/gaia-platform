import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import './styles/sidebar.css'
import logo from '../../assets/img/logo.png'
import SidebarItem from './SidebarItem';


const SideNavbar = ({ items, show }) => {



    return (
        <nav className='sidebar border-right'>
            <div className='primary-color p-3'>
                <img src={logo} alt='logo' className='img-fluid logo' />
            </div>
            <div className='h-100 bg-gray'>

                {items.map(item => (
                    <SidebarItem
                        key={item.name}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </div>
        </nav>
    );
};

export default SideNavbar;