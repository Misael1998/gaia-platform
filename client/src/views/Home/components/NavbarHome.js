import React from 'react';
import { Link } from 'react-router-dom';

const NavbarHome = ({ toSection, about, ourProducts, contact }) => {
    return (
        <nav className="navbar  w-100 navbar-light text-center primary-color">
            <div className='col-lg-3'>
                <button className='btn nav-links' onClick={() => toSection(about)}>
                    ¿Quienes somos?
                </button>
            </div>

            <div className='col-lg-3'>
                <button className='btn nav-links' onClick={() => toSection(ourProducts)}>
                    Nuestros productos
                </button>
            </div>

            <div className='col-lg-2'>
                <button className='btn nav-links' onClick={()=> toSection(contact)}>
                    Contáctanos
                </button>
            </div>

            <div className='col-lg-2'>
                <Link className='btn nav-links' to='/'>
                    Registrate
                </Link>
            </div>

            <div className='col-lg-2'>
                <Link className='btn nav-links' to='/'>
                    Login
                </Link>
            </div>

        </nav>
    );
};

export default NavbarHome;