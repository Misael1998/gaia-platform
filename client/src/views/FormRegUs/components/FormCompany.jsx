import React, { useState, useEffect } from "react";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import Swal from "sweetalert2";
import { registerCompanyUser } from "../../../services/Register";
import { selectSectors } from "../../../services/Sectors";
import Spinner from "../../../components/Spinner";

const FormCompany = ({ history }) => {
  //Creando el state para leer los inputs:
  const [infoCompany, handleCompanyInfo] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
    companyName: "",
    contactName: "",
    rtn: "",
    contactNumber: "",
    businessName: "",
    companyType: "",
    sector: "",
  });

  //State de los sectores
  const [sectors, handleSector] = useState([]);
  const [loading, setLoading] = useState(true);

  //State para el error:
  const [error, handleError] = useState(false);
  //state del error de rtn
  const [errorRTN, hanldeErrorRTN] = useState(false);

  //State para validacion del correo:
  const [errorEmail, handleErrorEmail] = useState(false);
  const [enableButton, setEnableButton] = useState(true);

  //Extrayendo los valores con destructuring:
  const {
    email,
    password,
    phone,
    address,
    companyName,
    contactName,
    rtn,
    contactNumber,
    businessName,
    companyType,
    sector,
  } = infoCompany;

  useEffect(() => {
    selectSectors()
      .then((res) => {
        handleSector(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // sectores=selectSectors();
    // console.log(sectores);
    if (
      (email.trim() !== "" &&
        password.trim() !== "" &&
        phone.trim() !== "" &&
        address.trim() !== "" &&
        companyName.trim() !== "" &&
        contactName.trim() !== "" &&
        rtn !== "") ||
      (rtn.length < 14 &&
        contactNumber.trim() !== "" &&
        businessName.trim() !== "")
    ) {
      setEnableButton(false);
      return;
    } else {
      setEnableButton(true);
    }
  }, [
    email,
    password,
    phone,
    address,
    companyName,
    contactName,
    rtn,
    contactNumber,
    businessName,
  ]);

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = (e) => {
    handleCompanyInfo({
      ...infoCompany,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion para validar el correo:
  const validarEmail = () => {
    const patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^  <>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (patron.test(document.getElementById("emailInput").value)) {
      handleErrorEmail(false);
    } else {
      handleErrorEmail(true);
    }
  };

  //Funcion para el boton de login:
  const submitUser = (e) => {
    e.preventDefault();

    validarEmail();

    //Validacion:
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      companyName.trim() === "" ||
      contactName.trim() === "" ||
      companyType.trim() === "" ||
      sector.trim() === "" ||
      rtn.trim() === "" ||
      rtn.trim() === "" ||
      contactNumber.trim() === "" ||
      businessName.trim() === ""
    ) {
      handleError(true);
      return;
    } else {
      if (rtn.length < 14) {
        hanldeErrorRTN(true);
        return;
      }
    }

    handleError(false);
    hanldeErrorRTN(false);

    //Peticion a endpoint de user
    registerCompanyUser(
      phone,
      address,
      companyName,
      contactName,
      companyType,
      sector,
      email,
      password,
      rtn,
      contactNumber,
      businessName
    )
      .then((res) => {
        Swal.fire(
          "Registro Exitoso",
          "Se ha creado el usuario exitosamente",
          "success"
        ).then((e) => {
          history.push("/login");
        });
      })

      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text,
        });
      });

    //Verificar si el usuario existe:

    //Mandar al usuario a la pagina de inicio:
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="limiter">
        <div className="container-login100 imgFormRegUs">
          <div className="wrap-login100 p-l-50 p-r-50 p-t-50 p-b-30">
            <form className="login100-form validate-form" onSubmit={submitUser}>
              <span className="login100-form-title p-b-25">
                Registro Empresa
              </span>

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
                  name="contactName"
                  placeholder="Nombre de Contacto"
                  onChange={handleChangeInfo}
                  value={contactName}
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
                <select
                  className="input100"
                  type="number"
                  name="sector"
                  onChange={handleChangeInfo}
                  value={sector}
                >
                  <option value="0">Tipo de Sector</option>

                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.sector}
                    </option>
                  ))}
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-apartment"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <select
                  className="input100"
                  type="number"
                  name="companyType"
                  onChange={handleChangeInfo}
                  value={companyType}
                >
                  <option value="0">Tipo de Compañía</option>
                  <option type="number" value={parseInt("1")}>
                    Restuarante
                  </option>
                  <option value={parseInt("2", 10)}>Hotel</option>
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-apartment"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  maxLength={14}
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

              {errorRTN ? (
                <p className="alert alert-danger error-p text-white">
                  El RTN debe tener 14 caractéres
                </p>
              ) : null}

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="text"
                  name="businessName"
                  placeholder="Razón Social"
                  onChange={handleChangeInfo}
                  value={businessName}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-license"></span>
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
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default FormCompany;
