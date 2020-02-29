import React, { useState, useEffect } from "react";
import "../../../../styles/FormLog.css";
import "../../../../styles/util.css";

const FormRequest = () => {
  //Creando el state para leer los inputs:
  const [infoRequest, handleRequest] = useState({
    nombreInsumo: "",
    cantidadInsumo: "",
    precioUnitario: "",
    medidaInsumo: "",
    formaPago: "",
    fechaEmision: "",
    empleadoRecibe: "",
    proveedor: "",
    numFactura: "",
    exentImpuesto: "",
    fechaExpiracion: "",
    empleadoSolicita: "",
    empleadoEnvia: ""
  });

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = e => {
    handleRequest({
      ...infoRequest,
      [e.target.name]: e.target.value
    });
  };

  //Extrayendo los valores con destructuring:
  const {
    nombreInsumo,
    cantidadInsumo,
    precioUnitario,
    medidaInsumo,
    formaPago,
    fechaEmision,
    empleadoRecibe,
    proveedor,
    numFactura,
    exentImpuesto,
    fechaExpiracion,
    empleadoSolicita,
    empleadoEnvia
  } = infoRequest;

  //State para el error:
  const [error, handleError] = useState(false);

  //State para habilitar el boton:
  const [enableButton, setEnableButton] = useState(true);

  //Funcion para los campos requeridos hasta habilitar el boton:
  useEffect(() => {
    if (
      nombreInsumo.trim() !== "" &&
      formaPago.trim() !== "" &&
      fechaEmision.trim() !== "" &&
      empleadoRecibe.trim() !== "" &&
      proveedor.trim() !== "" &&
      fechaExpiracion.trim() !== "" &&
      empleadoSolicita.trim() !== "" &&
      empleadoEnvia.trim() !== ""
    ) {
      setEnableButton(false);
      return;
    } else {
      setEnableButton(true);
    }
  }, [
    nombreInsumo,
    formaPago,
    fechaEmision,
    empleadoRecibe,
    proveedor,
    fechaExpiracion,
    empleadoSolicita,
    empleadoEnvia
  ]);

  //Funcion para el boton Realizar Solicitud:
  const submitRequest = e => {
    e.preventDefault();

    //Validacion:
    if (
      nombreInsumo.trim() === "" ||
      cantidadInsumo.trim() === "" ||
      precioUnitario.trim() === "" ||
      medidaInsumo.trim() === "" ||
      formaPago.trim() === "" ||
      fechaEmision.trim() === "" ||
      empleadoRecibe.trim() === "" ||
      proveedor.trim() === "" ||
      numFactura.trim() === "" ||
      exentImpuesto.trim() === "" ||
      fechaExpiracion.trim() === "" ||
      empleadoSolicita.trim() === "" ||
      empleadoEnvia.trim() === ""
    ) {
      handleError(true);
      return;
    }

    handleError(false);
    //Peticion al endpoint:
  };

  return (
    <div className="limiter">
      <div className="container-login200">
        <div className="wrap-login200 p-l-40 p-r-40 p-t-5 p-b-30">
          <form className="login100-form" onSubmit={submitRequest}>
            <div className="col-lg-6">
              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="number"
                  name="precioUnitario"
                  placeholder="Precio Unitario"
                  onChange={handleChangeInfo}
                  value={precioUnitario}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-tag"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <select
                  className="input100"
                  type="number"
                  name="medidaInsumo"
                  onChange={handleChangeInfo}
                  value={medidaInsumo}
                >
                  <option value="0">Medida Insumo</option>
                  <option value="1">Libras</option>
                  <option value="2">Kilogramos</option>
                  <option value="3">Unidad</option>
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-cart"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <select
                  className="input100"
                  type="number"
                  name="formaPago"
                  onChange={handleChangeInfo}
                  value={formaPago}
                >
                  <option value="0">Forma de Pago</option>
                  <option value="1">Efectivo</option>
                  <option value="2">Tarjeta</option>
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-diamond  "></span>
                </span>
              </div>

              <label className="mb-0">Fecha Emision:</label>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="date"
                  placeholder="Fecha de Emision"
                  name="fechaEmision"
                  onChange={handleChangeInfo}
                  value={fechaEmision}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-calendar-full"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="empleadoRecibe"
                  placeholder="Empleado que Recibe"
                  onChange={handleChangeInfo}
                  value={empleadoRecibe}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-user"></span>
                </span>
              </div>
            </div>

            {/*****************Segunda columna****************** */}

            <div className="col-lg-6">
              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="proveedor"
                  placeholder="Nombre Proveedor"
                  onChange={handleChangeInfo}
                  value={proveedor}
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
                  type="number"
                  name="numFactura"
                  placeholder="Numero de Factura"
                  onChange={handleChangeInfo}
                  value={numFactura}
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
                <select
                  className="input100"
                  type="number"
                  name="exentImpuesto"
                  onChange={handleChangeInfo}
                  value={exentImpuesto}
                >
                  <option value="0">Excento de Impuestos</option>
                  <option value="1">Si</option>
                  <option value="2">No</option>
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-license"></span>
                </span>
              </div>

              <label className="mb-0">Fecha Expiración: </label>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="date"
                  placeholder="Fecha de Expiración"
                  name="fechaExpiracion"
                  onChange={handleChangeInfo}
                  value={fechaExpiracion}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-calendar-full"></span>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="empleadoSolicita"
                  placeholder="Empleado que Solicita"
                  onChange={handleChangeInfo}
                  value={empleadoSolicita}
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
                  className="input100"
                  type="text"
                  name="empleadoEnvia"
                  placeholder="Empleado que Envia"
                  onChange={handleChangeInfo}
                  value={empleadoEnvia}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-user"></span>
                </span>
              </div>
            </div>

            <div className="row m-l-16">
              <div className="col-lg-5 p-r-0">
                <div
                  className="wrap-input100 validate-input m-b-16 row"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    className="input100 p-r-0"
                    type="text"
                    name="nombreInsumo"
                    placeholder="Nombre del Insumo"
                    onChange={handleChangeInfo}
                    value={nombreInsumo}
                  />

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-leaf m-l-5 p-l-3"></span>
                  </span>
                </div>
              </div>
              <div className="col-lg-5 p-r-0">
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Password is required"
                >
                  <input
                    className="input100"
                    type="number"
                    name="cantidadInsumo"
                    placeholder="Cantidad"
                    onChange={handleChangeInfo}
                    value={cantidadInsumo}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-list"></span>
                  </span>
                </div>
              </div>
              <div className="col-lg-2 p-r-0 p-l-0">
                <button>
                  <span className="focus-input100"></span>
                  <span className="symbol-input200">
                    <span className="lnr lnr-plus-circle"></span>
                  </span>
                </button>
              </div>
            </div>

            {error ? (
              <p className="alert alert-danger error-p text-white text-center">
                Todos los campos son obligatorios
              </p>
            ) : null}

            {/*Aqui comienza el boton!!!*/}
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
                Realizar Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRequest;
