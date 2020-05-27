import React, { useState, useEffect } from "react";
import "../styles/style.css";
import "../../../../styles/util.css";
import { updateIndividualData } from "../../../../services/UpdateIndividualProfile";
import Swal from "sweetalert2";

const EditIndividual = ({ data }) => {
  //State para almacenar los cambios:
  const [saveEdit, setSaveEdit] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  //State para el error:
  const [error, handleError] = useState(false);
  //State para el error de correo
  const [errorEmail, handleErrorEmail] = useState(false);

  //Funcion que captura los datos:
  const handleData = (e) => {
    handleError(false);
    validarEmail();

    setSaveEdit({
      ...saveEdit,
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

  //Destructuting:
  const { email, phone, address } = saveEdit;

  useEffect(() => {
    setSaveEdit(data);
  }, []);

  //Funcion que manda los datos:
  const submitRequest = (e) => {
    e.preventDefault();

    //Validacion:
    if (email.trim() === "" || phone.trim() === "" || address.trim() === "") {
      handleError(true);
      return;
    }

    //Condición si no existen problemas con el correo
    if (errorEmail === false) {
      updateIndividualData(email, phone, address)
        .then((res) => {
          Swal.fire(
            "Datos Actualizados",
            "Se han actualizados los datos exitosamente",
            "success"
          );
          if (res === 1) {
            window.location.reload();
          } else {
            Swal.fire(
              "Datos sin Modificar",
              "No se hicieron cambios en los datos",
              "success"
            );
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: error.title,
            text: error.text,
          });
        });
      return;
    }

    handleError(false);
  };

  return (
    <form
      className="form-group justify-content-center"
      onSubmit={submitRequest}
    >
      <div className="row ">
        <div className=" centrado">
          <label className="font-weight-bold mt-3">Correo</label>
          <input
            id="emailInput"
            type="text"
            name="email"
            className="form-control inpt-edit"
            placeholder="Correo"
            onChange={handleData}
            value={email}
          />

          {errorEmail ? (
            <p className="alert alert-danger error-p text-white">
              El correo ingresado no es válido!!!
            </p>
          ) : null}

          <label className="font-weight-bold mt-3">Teléfono</label>
          <input
            type="text"
            name="phone"
            className="form-control inpt-edit"
            placeholder="Telefono"
            onChange={handleData}
            value={phone}
          />

          <label className="font-weight-bold mt-3">Dirección</label>
          <input
            type="text"
            name="address"
            className="form-control inpt-edit"
            placeholder="Dirección"
            onChange={handleData}
            value={address}
          />
        </div>
      </div>

      {error ? (
        <p className="alert alert-danger error-p text-white text-center mt-4">
          Todos los campos son Obligatorios
        </p>
      ) : null}
      <button type="submit" className="row btn btn-lg btn-success btn-changes">
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditIndividual;
