import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import { loginUser } from "../../../services/Login";
import Swal from "sweetalert2";
import SessionStorageService from "../../../services/Storage";

const FormLog = ({ history }) => {
  //Creando el state para leer los inputs:
  const [information, handleInformation] = useState({
    email: "",
    password: "",
  });

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = (e) => {
    handleInformation({
      ...information,
      [e.target.name]: e.target.value,
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
  const { email, password } = information;

  //Funcion para el boton de login:
  const submitUser = (e) => {
    e.preventDefault();

    validarEmail();

    //Validacion:
    if (email.trim() === "" || password.trim() === "") {
      handleError(true);
      return;
    }

    handleError(false);

    //Peticion a endpoint de user
    loginUser(email, password)
      .then((res) => {
        const { user } = res;

        SessionStorageService.setToken(res.token);
        SessionStorageService.setItem("role", user.role);
        SessionStorageService.setItem("uName", user.firstName);
        Swal.fire(
          "Login exitoso",
          `Bienvenido ${user.firstName}`,
          "success"
        ).then((res) => {
          if (user.role === "employee") {
            history.push("/portal/");
          } else {
            if (user.role === "admin") {
              history.push("/admin");
            } else {
              history.push("/app");
            }
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text,
        });
      });
  };

  return (
    <div className="limiter">
      <div className="container-login100 bkgImgLogIn">
        <div className="wrap-login500 p-l-50 p-r-50 p-t-77 p-b-30">
          <form className="login-form validate-form" onSubmit={submitUser}>
            <span className="login100-form-title p-b-55">Login PyFlor</span>

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
              <p className="alert alert-danger error-p text-white">
                El correo ingresado no es valido
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

            {error ? (
              <p className="alert alert-danger error-p text-white">
                La contraseña no puede estar vacia
              </p>
            ) : null}

            <div className="contact100-form-checkbox m-l-4">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100">Recuerdame</label>
            </div>

            <div className="container-login100-form-btn p-t-25">
              <button type="submit" className="login100-form-btn">
                Iniciar Sesión
              </button>
            </div>

            <div className="text-center w-full p-t-115">
              <span className="txt1 mr-2">¿No tienes cuenta?</span>
              <Link className="txt1 bo1 hov1" to="/register">
                Registrarse
              </Link>
              <div className="pt-2">
                <span className="txt1 mr-2">¿Olvidaste tu contraseña?</span>
                <Link className="txt1 bo1 hov1" to="/recovery-password">
                  Recupérala
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLog;
