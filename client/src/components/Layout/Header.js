import React from 'react';
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'

const Header = ({ children }) => {
    return (
        <div className='col-12'>

            <nav className="navbar w-100 navbar-light primary-color ">
                <div className='w-25 h-25'>
                    <Link className="navbar-brand" to='/' >
                        <img src={logo} width='150' height='150' className="d-inline-block align-top img-fluid logo" alt="" />
                    </Link>
                </div>
                {children}
            </nav>
        </div>
    );
};

export default Header;