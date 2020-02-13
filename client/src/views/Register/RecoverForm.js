import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import ErrorMessage from '../../components/ErrorMessage';

const RecoverForm = () => {

    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState(false);

    const changePass = (e) => {
        e.preventDefault();

        if (newPassword.trim() !== verifyPassword.trim()
            || newPassword === ''
            || verifyPassword === '') {
            setError(true);
            return;
        }

        setError(false);

        //Peticion al API de cambio de contraseña
    }

    return (
        <div className='row no-gutters'>
            <Header />
            <div className='col-4 ml-4 mt-4'>

                <form onSubmit={changePass}>

                    <input
                        className='form-control m-4'
                        type='password'
                        placeholder='Nueva contraseña'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />


                    <input
                        className='form-control m-4'
                        type='password'
                        placeholder='Ingresa nuevamente la contraseña'
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />

                    <button type='submit' className='btn btn-success btn-block m-4'>Guardar contraseña</button>

                    {
                        error ? <ErrorMessage className='ml-5 text-center' message='Las contraseñas no coinciden' /> : null
                    }
                </form>
            </div>
        </div>
    );
};

export default RecoverForm;