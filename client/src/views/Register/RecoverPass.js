import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import ErrorMessage from '../../components/ErrorMessage';
import { MdArrowBack } from 'react-icons/md';
import { recoverPassword } from '../../services/Login';
import Swal from 'sweetalert2';
import SessionStorageService from '../../services/Storage';



const RecoverPass = ({ history }) => {

    const [email, setEmail] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [token, setToken] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorToken, setErrorToken] = useState(false);


    const sendMail = (e) => {
        e.preventDefault();

        if (email.trim() === '') {
            setErrorEmail(true);
            return;
        }
        setErrorEmail(false);

        //Se hace el request al correo
        recoverPassword(email)
            .then(res => {
                setShowInput(true);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrió un error al solicitar el correo',
                })
            })
    }

    const verifyToken = (e) => {
        e.preventDefault();

        if (token.trim() === '') {
            setErrorToken(true);
            return;
        }

        setErrorToken(false);
        SessionStorageService.setItem('resetToken', token);
        // Si el token es valido redirigir al form de recuperacion
        history.push('/recovery-password/form')
    }



    return (
        <div className='row no-gutters'>
            <Header />
            <div className='col-12 mt-4 ml-4'>
                <button className='btn btn-success btn-sm mb-3 ' onClick={() => history.push('/login')}>
                    <MdArrowBack size={20} color='white' /> Volver
                </button>
                <p>
                    Ingresa el correo al que enviaremos el token para
                    recuperar tu contraseña.
                </p>
            </div>
            <div className='col-4 ml-4'>
                <form onSubmit={sendMail} className='form-group'>
                    <input
                        className='form-control'
                        placeholder='Correo electrónico'
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <button
                        className='btn btn-success mt-3'
                        type='submit'
                        disabled={showInput}
                    >Enviar correo</button>
                    {
                        showInput ?
                            <span>
                                <button
                                    type='button'
                                    className=' btn btn-link mr-2 mt-3'
                                    onClick={sendMail}
                                > Reenviar correo</button>
                            </span> :
                            null
                    }
                </form>
                {
                    errorEmail ? <ErrorMessage message='Debes ingresar un correo valido para recuperar tu contraseña' /> : null
                }
            </div>

            <div className='col-4 ml-5'>
                {
                    showInput ?
                        <form onClick={verifyToken}>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Token'
                                value={token}
                                onChange={(event) => setToken(event.target.value)}
                            />
                            <button className='btn btn-success mt-3' type='submit'>
                                Verificar
                            </button>

                        </form> : null
                }
                {
                    errorToken ? <ErrorMessage className='mt-3 text-center' message='El token ingresado no es valido' /> : null
                }
            </div>

        </div>
    );
};

export default RecoverPass;