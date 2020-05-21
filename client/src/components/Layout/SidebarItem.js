import React from 'react';
import { Link } from 'react-router-dom'

const SidebarItem = ({ icon, label, link, onClick }) => {

    if (onClick) {
        return (
            <div className='d-inline-block border-bottom border-top list-group-item-action p-3 hov-pointer nav-item' onClick={onClick}>
                <div className='side-icon font-m'>
                    <span className='m-lg-2 m-md-1 m-sm-0 '>
                        {icon}
                    </span>
                    <span className='nav-text'>
                        {label}
                    </span>
                </div>
            </div>
        );
    } else {

        return (
            <Link
                className='d-inline-block border-bottom border-top list-group-item-action p-3 nav-item '
                to={link}
            >
                <div className='side-icon font-m'>
                    <span className='m-lg-2 m-md-1 m-sm-0 '>
                        {icon}
                    </span>
                    <span className='nav-text'>
                        {label}
                    </span>
                </div>
            </Link>
        );
    }

};

export default SidebarItem;