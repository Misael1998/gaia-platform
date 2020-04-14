import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { updateEnterpriseData } from "../../../../services/UpdateEnterpriseProfile";
import Swal from "sweetalert2";

const Edit = ({ data }) => {
  //State para almacenar los cambios:
  const [saveEdit, setSaveEdit] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contact_name: "",
    contact_number: "",
  });

  //State para el error:
  const [error, handleError] = useState(false);

  //Funcion que captura los datos:
  const handleData = (e) => {
    setSaveEdit({
      ...saveEdit,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setSaveEdit(data);
  }, []);

  //Destructuting:
  const { email, phone, address, contact_name, contact_number } = saveEdit;

  //Funcion que manda los datos:
  const submitRequest = (e) => {
    e.preventDefault();

    //Validacion:
    if (
      email.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      contact_name.trim() === "" ||
      contact_number.trim() === ""
    ) {
      handleError(true);
      return;
    }

    handleError(false);

    //Funcion que establecera los valores a editar traidos de la BD:
    updateEnterpriseData(email, phone, address, contact_name, contact_number)
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
      <div className="row">
        <div className="col-md-6 cl-sm-4">
          <label className="font-weight-bold mt-3">Correo</label>
          <input
            type="text"
            name="email"
            className="form-control inpt-edit"
            placeholder="Correo"
            onChange={handleData}
            value={email}
          />

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

        <div className="col-md-6 cl-sm-4">
          <label className="font-weight-bold mt-3">Nombre de Contacto</label>
          <input
            type="text"
            name="contact_name"
            className="form-control inpt-edit"
            placeholder="Nombre de Contacto"
            onChange={handleData}
            value={contact_name}
          />

          <label className="font-weight-bold mt-3">Número de Contacto</label>
          <input
            type="text"
            name="contact_number"
            className="form-control inpt-edit"
            placeholder="Número de Contacto"
            onChange={handleData}
            value={contact_number}
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


export default Edit;
