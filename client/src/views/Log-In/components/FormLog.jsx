import React from "react";
import { Link } from "react-router-dom";
import "../style/FormLog.css";
import "../style/util.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../fonts/Linearicons-Free-v1.0.0/icon-font.min.css";

const FormLog = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-55">Login PyFlor</span>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="correo"
                placeholder="Correo"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-envelope"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="contra"
                placeholder="Contraseña"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-lock"></span>
              </span>
            </div>

            <div className="contact100-form-checkbox m-l-4">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" for="ckb1">
                Recuerdame
              </label>
            </div>

            <div className="container-login100-form-btn p-t-25">
              <button className="login100-form-btn">Login</button>
            </div>

            <div className="text-center w-full p-t-115">
              <span className="txt1 mr-2">¿No tienes cuenta?</span>

              <Link className="txt1 bo1 hov1" href="#">
                Registrarse
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLog;
