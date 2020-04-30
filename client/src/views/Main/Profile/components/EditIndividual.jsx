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

    setSaveEdit({
      ...saveEdit,
      [e.target.name]: e.target.value,
    });
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

    //validacion de correo
    if (email.includes('@') ===false || email.includes('.com') === false) {
      handleErrorEmail(true);
      return;
    }

    handleError(false);

    //Funcion que establecera los valores a editar traidos de la BD:

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
            type="text"
            name="email"
            className="form-control inpt-edit"
            placeholder="Correo"
            onChange={handleData}
            value={email}
          />

          {errorEmail ? (
            <p className="alert alert-danger error-p text-white">
              El correo ingresado no es valido!!!
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
