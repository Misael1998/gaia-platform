import React, { useState, useEffect } from "react";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import Swal from "sweetalert2";
import Title from "../../../components/Title";
import { FaWpforms } from "react-icons/fa";
import { insertProvider } from '../../../services/Providers'

const FormRegEmp = ({ history }) => {


    //Creando el state para leer los inputs:
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //State para el boton:
    const [enableButton, setEnableButton] = useState(true);

    //State para el error:
    const [error, handleError] = useState(false);

    //State para validacion del correo:
    const [errorEmail, handleErrorEmail] = useState(false);


    useEffect(() => {
        if (
            email.trim() !== "" &&
            name.trim() !== "" &&
            phone.trim() !== ""
        ) {
            setEnableButton(false);
            return;
        } else {
            setEnableButton(true);
        }
    }, [
        email,
        name,
        phone,
    ]);

    //Funcion para validar el correo:
    const validarEmail = () => {
        const patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (patron.test(document.getElementById("emailInput").value)) {
            handleErrorEmail(false);
        } else {
            handleErrorEmail(true);
        }
    };

    //Funcion para el boton de login:
    const submitProvider = e => {
        e.preventDefault();
        validarEmail();

        //Validacion:
        if (
            name.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === ""
        ) {
            handleError(true);
            return;
        }

        handleError(false);
        const payload = { name, phone, email };
        insertProvider(payload)
            .then(res => {
                Swal.fire('Proveedor registrado', 'Se registró el proveedor con exito', 'success');
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: error.title,
                    text: error.text,
                });
            })

        //Reiniciando el state:
        setName('');
        setPhone('');
        setEmail('');
    };


    return (
        <div className="limiter m-t-50">
            <div className="m-l-30">
                <Title icon={<FaWpforms size={40} />} title="Registro de Proveedores" />
            </div>
            <div className="container-login100 min-height p-t-0">
                <div className="wrap-login100 p-l-20 p-t-0 p-r-20 p-b-30">
                    <form className="login100-form validate-form" onSubmit={submitProvider}>
                        <span className="login100-form-title p-b-25"></span>

                        {/*Primera Columna*/}
                        <div className="col-lg-6">
                            <div
                                className="wrap-input100 validate-input m-b-16"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="name"
                                    placeholder="Nombre del proveedor"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-user"></span>
                                </span>
                            </div>
                            <div
                                className="wrap-input100 validate-input m-b-16"
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input
                                    id="emailInput"
                                    className="input100"
                                    type="text"
                                    name="email"
                                    placeholder="Correo"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-envelope"></span>
                                </span>
                            </div>

                            {errorEmail ? (
                                <p className="alert alert-danger error-p text-white">
                                    El correo ingresado no es valido!!!
                                </p>
                            ) : null}

                        </div>
                        {/*Fin primera Columna*/}

                        {/*Segunda Columna*/}
                        <div className="col-lg-6">
                            <div
                                className="wrap-input100 validate-input m-b-16"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    type="phone"
                                    name="phone"
                                    placeholder="Telefono"
                                    maxLength={8}
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-phone-handset"></span>
                                </span>
                            </div>
                        </div>
                        {/*Fin segunda Columna*/}

                        {error ? (
                            <p className="alert alert-danger error-p text-white">
                                Todos los campos son obligatorios!!!
                            </p>
                        ) : null}

                        <div className="contact100-form-checkbox m-l-4">
                            <input
                                className="input-checkbox100"
                                id="ckb1"
                                type="checkbox"
                                name="remember-me"
                            />
                        </div>

                        <div className="container-login100-form-btn p-t-25">
                            <button
                                type="submit"
                                className={
                                    !enableButton
                                        ? "login100-form-btn"
                                        : "btn btn-lg btn-disabled"
                                }
                                disabled={enableButton}
                            >
                                Registrar Proveedor
                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormRegEmp;
