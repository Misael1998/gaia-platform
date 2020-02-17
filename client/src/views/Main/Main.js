import React from 'react';
import { Redirect } from 'react-router-dom'
import SessionStorageService from '../../services/Storage';

const Main = () => {

    const token = SessionStorageService.getToken();
   
    return (

        <div>
            {token === null ? <Redirect exact from='/app' to='/' /> : null}
            <p>
                Main app
               </p>
        </div>

    );
};

export default Main;