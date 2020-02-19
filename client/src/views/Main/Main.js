import React from 'react';
import { Redirect } from 'react-router-dom'
import SessionStorageService from '../../services/Storage';

import logo from '../../assets/img/logo.png'

const Main = () => {

    const token = SessionStorageService.getToken();

    return (

        <div className='row w-100 h-100 primary-color '>
            {token === null ? <Redirect exact from='/app' to='/' /> : null}
            <div className='col-12 text-center m-t-100 m-b-200 p-t-100 p-b-100 text-white  '>
                <div className='logo w-25 ml-auto mr-auto'>
                    <img src={logo} alt='logo' className='img-fluid  p-4' />
                </div>

                <h2>Sitio en construccion</h2>
                <h4>Estamos trabajando para darte la mejor experiencia</h4>
            </div>
        </div>

    );
};

export default Main;