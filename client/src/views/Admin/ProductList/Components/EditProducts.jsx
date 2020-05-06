import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {getCategories} from "../../../../services/Categories";

const EditProducts = ({ product }) => {
  //State para almacenar los cambios:
  const [saveEdit, setSaveEdit] = useState({
    name: "",
    description: ""
    
  });

  const [prices, setPrices] = useState([]);

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


  const fnPrices = (id, p) => {
    setPrices([
      ...prices,
      {
        "companyType": id,
        "price": p
      }
    ])
  }

  //Destructuting:
  const { name, description } = saveEdit;

  useEffect(() => {
    setSaveEdit(product);
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
    // if (email.trim() === "" || phone.trim() === "" || address.trim() === "") {
    //   handleError(true);
    //   return;
    // }

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
            name="name"
            className="form-control inpt-edit"
            placeholder="nombre del producto"
            onChange={handleData}
            value={name}
          />

          <label className="font-weight-bold mt-3">Descripción</label>
          <input
            type="text"
            name="description"
            className="form-control inpt-edit"
            placeholder="Descripción"
            onChange={handleData}
            value={description}
          />

          
        </div>

         <div className="col-md-6 cl-sm-4">
          {product.prices.map((reg) =>(
            <div>
              <label className="font-weight-bold mt-3">Precio {reg.companyDescription}</label>
            <input
              id="emailInput"
              type="number"
              name="prices"
              className="form-control inpt-edit"
              placeholder="Precio Hotel"
              onChange={fnPrices(reg.companyId,reg.price)}
              value={reg.price}
            />
            </div>
          ))}

          
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
