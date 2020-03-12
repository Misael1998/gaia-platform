import React, { useState, useEffect } from "react";
import "../../../../styles/FormLog.css";
import "../../../../styles/util.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import { registerEmployee } from "../../../../services/RegEmployee";
import Swal from "sweetalert2";
import Title from "../../../../components/Title";
import { FaWpforms } from "react-icons/fa";

const FormRegEmp = ({ history }) => {
  //Creando el state para leer los inputs:
  const [infoEmp, handleEnpInfo] = useState({
    empName: "",
    empLast: "",
    address: "",
    phone: "",
    email: "",
    jobTitle: "",
    department: "",
    admissionDate: "",
    password: ""
  });

  //State para el boton:
  const [enableButton, setEnableButton] = useState(true);

  //State para el error:
  const [error, handleError] = useState(false);

  //State para validacion del correo:
  const [errorEmail, handleErrorEmail] = useState(false);

  //Extrayendo los valores con destructuring:
  const {
    empName,
    empLast,
    address,
    phone,
    email,
    jobTitle,
    department,
    admissionDate,
    password
  } = infoEmp;

  useEffect(() => {
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      empName.trim() !== "" &&
      address.trim() !== "" &&
      phone.trim() !== "" &&
      jobTitle.trim() !== "" &&
      department.trim() !== "" &&
      admissionDate.trim() !== ""
    ) {
      setEnableButton(false);
      return;
    }
  }, [
    email,
    password,
    empName,
    address,
    phone,
    jobTitle,
    department,
    admissionDate
  ]);

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = e => {
    handleEnpInfo({
      ...infoEmp,
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

  //Funcion para el boton de login:
  const submitEmp = e => {
    e.preventDefault();

    validarEmail();

    //Validacion:
    if (
      empName.trim() === "" ||
      empLast.trim() === "" ||
      address.trim() === "" ||
      phone.trim() === "" ||
      email.trim() === "" ||
      jobTitle.trim() === "" ||
      department.trim() === "" ||
      admissionDate.trim() === "" ||
      password.trim() === ""
    ) {
      handleError(true);
      return;
    }

    handleError(false);

    //Peticion al endpoint de registro empleado:
    registerEmployee(
      empName,
      empLast,
      address,
      phone,
      email,
      jobTitle,
      department,
      admissionDate,
      password
    )
      .then(res => {
        Swal.fire(
          "Registro Exitoso",
          "Se ha creado el empleado exitosamente",
          "success"
        );
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text
        });
      });

    //Reiniciando el state:
    handleEnpInfo({
      empName: "",
      empLast: "",
      address: "",
      phone: "",
      email: "",
      jobTitle: "",
      department: "",
      admissionDate: "",
      password: ""
    });
  };

  return (
    <div className="limiter m-t-50">
      <div className="m-l-30">
        <Title icon={<FaWpforms size={40} />} title="Registro de Empleado" />
      </div>
      <div className="container-login100 p-t-0">
        <div className="wrap-login300 p-l-20 p-t-0 p-r-20 p-b-30">
          <form className="login100-form validate-form" onSubmit={submitEmp}>
            <span className="login100-form-title p-b-25"></span>

            {/*Primera Columna*/}
            <div className="col-lg-6">
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
                  type="text"
                  name="empName"
                  placeholder="Nombre"
                  onChange={handleChangeInfo}
                  value={empName}
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
                  name="empLast"
                  placeholder="Apellido"
                  onChange={handleChangeInfo}
                  value={empLast}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-user"></span>
                </span>
              </div>
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
                  type="text"
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
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <select
                  className="input100"
                  type="text"
                  name="jobTitle"
                  onChange={handleChangeInfo}
                  value={jobTitle}
                >
                  <option value="0">Puesto de Trabajo</option>
                  <option value="1">Gerente</option>
                  <option value="2">Asistente</option>
                  <option value="3">Administrador de Cuentas</option>
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-user"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <select
                  className="input100"
                  type="text"
                  name="department"
                  onChange={handleChangeInfo}
                  value={department}
                >
                  <option value="0">Departamento de Trabajo</option>
                  <option value="1">Contabilidad</option>
                  <option value="2">Administracion</option>
                  <option value="3">Marketing</option>
                  <option value="4">Produccion</option>
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-apartment"></span>
                </span>
              </div>

              <label>Fecha de Admision</label>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="date"
                  name="admissionDate"
                  onChange={handleChangeInfo}
                  value={admissionDate}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-calendar-full"></span>
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
                Registrar Empleado
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegEmp;
