import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import "../style/FormUser.css";
import "../style/util.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../fonts/Linearicons-Free-v1.0.0/icon-font.min.css";

const FormCompany = () => {
  //Creando el state para leer los inputs:
  const [infoCompany, handleCompanyInfo] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
    companyName: "",
    rtn: "",
    contactNumber: ""
    
  });

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = e => {
    handleCompanyInfo({
      ...infoCompany,
      [e.target.name]: e.target.value
    });
  };

  //Funcion para validar el correo:
  const validarEmail = () => {
    const patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (patron.test(document.getElementById("emailInput").value)) {
      handleErrorEmail(false);
    } else {
      handleErrorEmail(true);
    }
  };

  //State para el error:
  const [error, handleError] = useState(false);

  //State para validacion del correo:
  const [errorEmail, handleErrorEmail] = useState(false);

  //Extrayendo los valores con destructuring:
  const { email, password, phone, address, companyName, rtn, contactNumber } = infoCompany;

  //Funcion para el boton de login:
  const submitUser = e => {
    e.preventDefault();

    validarEmail();

    //Validacion:
    if (email.trim() === "" || password.trim() === "" || phone.trim() === "" || address.trim() === "" 
        || companyName.trim() === "" || rtn.trim() === ""  || contactNumber.trim() === "") {
      handleError(true);
      return;
    }

    handleError(false);

    //Asignando un id:
    infoCompany.id = shortid();

    //Verificar si el usuario existe:

    //Mandar al usuario a la pagina de inicio:
  };

  return (
    <div className="limiter">
      <div className="container-login100 imgFormRegUs">
        <div className="wrap-login100 p-l-50 p-r-50 p-t-50 p-b-30">
          <form className="login100-form validate-form" onSubmit={submitUser}>
            <span className="login100-form-title p-b-25">Registro Empresa</span>

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
                onChange={handleChangeInfo}
                value={email}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-envelope"></span>
              </span>
            </div>

            {errorEmail ? (
              <p className="alert alert-danger error-p">
                El correo ingresado no es valido!!!
              </p>
            ) : null}

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChangeInfo}
                value={password}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-lock"></span>
              </span>
            </div>

             
            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="phone"
                name="phone"
                placeholder="Teléfono"
                onChange={handleChangeInfo}
                value={phone}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-phone-handset"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="address"
                name="address"
                placeholder="Dirección"
                onChange={handleChangeInfo}
                value={address}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-home"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="companyName"
                placeholder="Nombre Empresa"
                onChange={handleChangeInfo}
                value={companyName}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-user"></span>
              </span>
            </div>


            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="rtn"
                placeholder="RTN"
                onChange={handleChangeInfo}
                value={rtn}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-paperclip"></span>
              </span>
            </div>


            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="contactNumber"
                placeholder="Número de Contacto"
                onChange={handleChangeInfo}
                value={contactNumber}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-license"></span>
              </span>
            </div>


            {error ? (
              <p className="alert alert-danger error-p">
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
              <button type="submit" className="login100-form-btn">
                Registrarse
              </button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCompany;
