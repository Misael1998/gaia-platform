import React from 'react';
import './styles/sidebar.css'
import logo from '../../assets/img/logo.png'
import SidebarItem from './SidebarItem';
import SidebarDrop from './SidebarDrop'


const SideNavbar = ({ items, show }) => {



    return (
        <nav className='sidebar border-right'>
            <div className='primary-color p-3'>
                <img src={logo} alt='logo' className='img-fluid logo' />
            </div>
            <div className='h-100 bg-gray'>

                {items.map(item => {
                    if (Array.isArray(item.subitems)) {
                        return <SidebarDrop 
                            key={item.name}
                            icon={item.icon}
                            name={item.label}
                            subitems={item.subitems}
                        />
                    } else {   
                       return <SidebarItem
                            key={item.name}
                            icon={item.icon}
                            label={item.label}
                            link={item.link}
                        />
                    }

                })}
            </div>
        </nav>
    );
};

export default SideNavbar;