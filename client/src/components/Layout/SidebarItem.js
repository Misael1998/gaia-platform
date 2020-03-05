import React from 'react';
import { Link } from 'react-router-dom'

const SidebarItem = ({ icon, label, link, onClick }) => {

    if (onClick) {
        return (
            <div className='d-inline-block border-bottom border-top list-group-item-action p-3 hov-pointer' onClick={onClick}>
                <div className='side-icon font-m'>
                    <span className='m-2 '>
                        {icon}
                    </span>
                    {label}
                </div>
            </div>
        );
    } else {

        return (
            <Link
                className='d-inline-block border-bottom border-top list-group-item-action p-3 '
                to={link}
            >
                <div className='side-icon font-m'>
                    <span className='m-2 '>
                        {icon}
                    </span>
                    {label}
                </div>
            </Link>
        );
    }

};

export default SidebarItem;