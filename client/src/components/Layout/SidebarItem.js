import React from 'react';

const SidebarItem = ({ icon, label, link }) => {
    return (
        <div className='d-inline-block border-bottom border-top list-group-item-action p-3 '>
            <div className='side-icon'>
                <span className='m-2 '>
                    {icon}
                </span>
                {label}
            </div>
        </div>
    );
};

export default SidebarItem;