import React, { useState, useEffect } from "react";
import "../styles/style.css";

const EditIndividual = ({ data }) => {
  //State para almacenar los cambios:
  const [saveEdit, setSaveEdit] = useState({
    email: "",
    phone: "",
    address: ""
  });

  //State para el error:
  const [error, handleError] = useState(false);

  //Funcion que captura los datos:
  const handleData = e => {
    setSaveEdit({
      ...saveEdit,
      [e.target.name]: e.target.value
    });
  };

  //Destructuting:
  const { email, phone, address } = saveEdit;

  useEffect(() => {
    setSaveEdit(data);
  }, []);

  //Funcion que manda los datos:
  const submitRequest = e => {
    e.preventDefault();

    //Validacion:
    if (email.trim() === "" || phone.trim() === "" || address.trim() === "") {
      handleError(true);
      return;
    }

    handleError(false);

    //Funcion que establecera los valores a editar traidos de la BD:

    console.log("Los datos a editar son: ", email, phone, address);
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
