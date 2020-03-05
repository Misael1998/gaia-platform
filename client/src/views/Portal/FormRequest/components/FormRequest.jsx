import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../../../styles/FormLog.css";
import "../../../../styles/util.css";
import { selectSupplies } from "../../../../services/Supplies";
import { selectProviders } from "../../../../services/Providers";
import { selectSar } from "../../../../services/Sar";
import { makeOrder } from "../../../../services/Orders";
import moment from "moment";

const FormRequest = () => {
  //Creando el state para leer los inputs:
  const [infoRequest, handleRequest] = useState({
    supplies: [],
    unit: "",
    idPaymentMethod: "",
    emissionDate: "",
    idReceiverEmployee: "",
    idProvider: "",
    numBill: "",
    idSarType: "",
    expireDate: "",
    idAddressEmployee: "",
    idSenderEmployee: "",
    idCreatedEmployee: ""
  });

  const [supply, setSupply] = useState("");
  const [quantity, setQuantity] = useState("");

  //State para los insumos:
  const [supplyarray, handleSupplyArray] = useState([]);

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = e => {
    handleRequest({
      ...infoRequest,
      [e.target.name]: e.target.value
    });
  };

  //Extrayendo los valores con destructuring:
  const {
    supplies,
    unit,
    idPaymentMethod,
    emissionDate,
    idReceiverEmployee,
    idProvider,
    numBill,
    idSarType,
    expireDate,
    idAddressEmployee,
    idSenderEmployee,
    idCreatedEmployee
  } = infoRequest;

  //Funcion que toma el insumo y la cantidad:
  const obtainSupply = () => {
    let supplyToAdd = {
      idSupply: supply,
      quantity
    };
    console.log(supplyToAdd);
    let newSupplies = [...infoRequest.supplies, supplyToAdd];
    console.log(newSupplies);
    handleRequest({ ...infoRequest, supplies: newSupplies });
  };

  //State para el error:
  const [error, handleError] = useState(false);

  //State de los tipos de sar
  const [sar, handleSar] = useState([]);

  //State para habilitar el boton:
  const [enableButton, setEnableButton] = useState(true);

  useEffect(() => {
    // selectSupplies()
    //   .then(res => {
    //     handleSupplyArray(res);
    //   })
    //   .catch(err => console.log(err));
  }, []);

  //Funcion para los campos requeridos hasta habilitar el boton:
  useEffect(() => {
    if (
      idPaymentMethod.trim() !== "" &&
      emissionDate.trim() !== "" &&
      idReceiverEmployee.trim() !== "" &&
      idProvider.trim() !== "" &&
      expireDate.trim() !== "" &&
      idAddressEmployee.trim() !== "" &&
      idSenderEmployee.trim() !== ""
    ) {
      setEnableButton(false);
      return;
    } else {
      setEnableButton(true);
    }
  }, [
    idPaymentMethod,
    emissionDate,
    idReceiverEmployee,
    idProvider,
    expireDate,
    idAddressEmployee,
    idSenderEmployee
  ]);

  //Formateando las fechas:
  const formatEmission = moment(emissionDate);
  const formatExpire = moment(expireDate);

  //Funcion para el boton Realizar Solicitud:
  const submitRequest = e => {
    e.preventDefault();

    //Validacion:
    if (
      quantity.trim() === "" ||
      unit.trim() === "" ||
      idPaymentMethod.trim() === "" ||
      emissionDate.trim() === "" ||
      idReceiverEmployee.trim() === "" ||
      idProvider.trim() === "" ||
      numBill.trim() === "" ||
      idSarType.trim() === "" ||
      expireDate.trim() === "" ||
      idAddressEmployee.trim() === "" ||
      idSenderEmployee.trim() === ""
    ) {
      handleError(true);
      return;
    }

    handleError(false);

    //Peticion al endpoint:
    makeOrder(
      formatEmission.format("MM/DD/YYYY"),
      formatExpire.format("MM/DD/YYYY"),
      idCreatedEmployee,
      idProvider,
      idSarType,
      idPaymentMethod,
      idSenderEmployee,
      idReceiverEmployee,
      idAddressEmployee,
      numBill,
      unit,
      supplies
    )
      .then(res => {
        console.log("Lo que retorna el endpoint: ", res);

        Swal.fire(
          "Creacion de Orden Exitosa",
          "La orden se ha creado",
          "success"
        ).then(e => {});
      })

      .catch(error => {
        console.log("Lo que retorna el endpoint: ", error);
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text
        });
      });
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
                  // onChange={handleChangeInfo}
                  // value={precioUnitario}
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
                  name="unit"
                  onChange={handleChangeInfo}
                  value={unit}
                >
                  <option value="0">Medida Insumo</option>
                  <option value="Libras">Libras</option>
                  <option value="Kilogramos">Kilogramos</option>
                  <option value="Unidad">Unidad</option>
                  <option value="Gramos">Gramos</option>
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
                  name="idPaymentMethod"
                  onChange={handleChangeInfo}
                  value={idPaymentMethod}
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
                  name="emissionDate"
                  onChange={handleChangeInfo}
                  value={emissionDate}
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
                <select
                  className="input100"
                  type="text"
                  name="idReceiverEmployee"
                  onChange={handleChangeInfo}
                  value={idReceiverEmployee}
                >
                  <option value="0">Empleado Recibe</option>
                  <option value="1">Empleado 1</option>
                  <option value="2">Empleado 2</option>
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
                  name="idCreatedEmployee"
                  onChange={handleChangeInfo}
                  value={idCreatedEmployee}
                >
                  <option value="0">Empleado Crea</option>
                  <option value="1">Empleado 1</option>
                  <option value="2">Empleado 2</option>
                </select>

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
                <select
                  className="input100"
                  type="text"
                  name="idProvider"
                  placeholder="Nombre Proveedor"
                  onChange={handleChangeInfo}
                  value={idProvider}
                >
                  <option value="0">Nombre Proveedor</option>
                  <option value="1">Proveedor 1</option>
                  <option value="2">Proveedor 2</option>
                  <option value="3">Proveedor 3</option>
                  <option value="4">Proveedor 4</option>
                </select>
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
                  name="numBill"
                  placeholder="Numero de Factura"
                  onChange={handleChangeInfo}
                  value={numBill}
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
                  name="idSarType"
                  onChange={handleChangeInfo}
                  value={idSarType}
                >
                  <option value="0">Tipo de SAR</option>
                  <option value="1">Gravado</option>
                  <option value="2">Excento</option>
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
                  name="expireDate"
                  onChange={handleChangeInfo}
                  value={expireDate}
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
                <select
                  className="input100"
                  type="text"
                  name="idAddressEmployee"
                  onChange={handleChangeInfo}
                  value={idAddressEmployee}
                >
                  <option value="0">Empleado Solicita</option>
                  <option value="1">Empleado 1</option>
                  <option value="2">Empleado 2</option>
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
                  name="idSenderEmployee"
                  onChange={handleChangeInfo}
                  value={idSenderEmployee}
                >
                  <option value="0">Empleado Envia</option>
                  <option value="1">Empleado 1</option>
                  <option value="2">Empleado 2</option>
                </select>
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
                  <select
                    className="input100 p-r-0"
                    type="text"
                    name="idSupply"
                    placeholder="Nombre del Insumo"
                    onChange={e => setSupply(e.target.value)}
                    value={supply}
                  >
                    <option value="0">Nombre Insumo</option>
                    <option value="1">Supply 1</option>
                    <option value="2">Supply 2</option>
                    <option value="3">Supply 3</option>
                    <option value="4">Supply 4</option>
                    <option value="5">Supply 5</option>
                    {/* {supplyarray.map(supp => (
                      <option key={supp.idSupplies} value={supp.name}>
                        {supp.name}
                      </option>
                    ))} */}
                  </select>

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
                    name="quantity"
                    placeholder="Cantidad"
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-list"></span>
                  </span>
                </div>
              </div>
              <div className="col-lg-2 p-r-0 p-l-0">
                <button type="button" onClick={obtainSupply}>
                  <span className="focus-input100"></span>
                  <span className="symbol-input200">
                    <span className="lnr lnr-plus-circle"></span>
                  </span>
                </button>
              </div>
              <div className="col-12">
                <ul>
                  {supplies.length !== 0 ? (
                    supplies.map(supply => {
                      return (
                        <li key={supply.idSupply}>
                          idInsumo: {supply.idSupply}
                          cantidad:
                          <span className="m-l-4">{supply.quantity}</span>
                        </li>
                      );
                    })
                  ) : (
                    <p>No existen insumos para esta peticion</p>
                  )}
                </ul>
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
