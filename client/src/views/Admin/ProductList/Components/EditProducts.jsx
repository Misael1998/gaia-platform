import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {getCategories} from "../../../../services/Categories";

const EditProducts = ({ data }) => {
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
  //state para las categorías
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

    //función para traer las categorías
    useEffect(() => {
      getCategories()
        .then((res) => {
          setCategories(res);
          setLoading(false);
        })
        .catch((err) => console.log("El error es:", err));
    }, []);

  //Funcion que manda los datos:
  const submitRequest = (e) => {
    e.preventDefault();

    //Validacion:
    if (email.trim() === "" || phone.trim() === "" || address.trim() === "") {
      handleError(true);
      return;
    }

    //guardar los cambios
    //   updateIndividualData(email, phone, address)
    //     .then((res) => {
    //       Swal.fire(
    //         "Datos Actualizados",
    //         "Se han actualizados los datos exitosamente",
    //         "success"
    //       );
    //       if (res === 1) {
    //         window.location.reload();
    //       } else {
    //         Swal.fire(
    //           "Datos sin Modificar",
    //           "No se hicieron cambios en los datos",
    //           "success"
    //         );
    //       }
    //     })
    //     .catch((error) => {
    //       Swal.fire({
    //         icon: "error",
    //         title: error.title,
    //         text: error.text,
    //       });
    //     });
    //   return;

    handleError(false);
  };

  return (
    <form
      className="form-group justify-content-center"
      onSubmit={submitRequest}
    >
      <div className="row ">
        <div className="col-md-6 cl-sm-4 ">
          <label className="font-weight-bold mt-3">Nombre Producto</label>
          <input
            type="text"
            name="productName"
            className="form-control inpt-edit"
            placeholder="nombre del producto"
            onChange={handleData}
            value={address}
          />

          <label className="font-weight-bold mt-3">Descripción</label>
          <input
            type="text"
            name="address"
            className="form-control inpt-edit"
            placeholder="Descripción"
            onChange={handleData}
            value={address}
          />

          <label className="font-weight-bold mt-3">Categoría</label>
          <select
            className="form-control inpt-edit"
            onChange={handleData}
            value={address}
          >
            <option value="0">Seleccione una Categoria</option>
            {
                    categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  }
          </select>
        </div>

        <div className="col-md-6 cl-sm-4">
          <label className="font-weight-bold mt-3">Precio Hotel</label>
          <input
            id="emailInput"
            type="number"
            name="email"
            className="form-control inpt-edit"
            placeholder="Precio Hotel"
            onChange={handleData}
            value={email}
          />

          <label className="font-weight-bold mt-3">Precio Restaurante</label>
          <input
            type="number"
            name="address"
            className="form-control inpt-edit"
            placeholder="Precio Restaurante"
            onChange={handleData}
            value={address}
          />

          <label className="font-weight-bold mt-3">Precio Supermercado</label>
          <input
            type="number"
            name="address"
            className="form-control inpt-edit"
            placeholder="Precio Supermercado"
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

export default EditProducts;
