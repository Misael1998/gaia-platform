import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCategories } from "../../../../services/Categories";
import Spinner from "../../../../components/Spinner";
import { editProduct } from "../../../../services/Products";

const EditProducts = ({ product }) => {
  //***** Inicio Trabajo de Rony ******//

  //State pa guardar los cambios del Producto:

  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [proCat, setProdCat] = useState();
  const [productPrices, setProductPrices] = useState([]);

  //state para las categorías
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //State para el error:
  const [error, handleError] = useState(false);

  //Destructuring de los elementos:
  const {
    productId,
    name,
    categorId,
    categoryName,
    description,
    sarId,
  } = product;

  //Funcio para capturar el precio por compañia:
  const getPriceCom = (c, p) => {
    let searchPrice = productPrices.find((price) => price.companyType === c);

    let arrP;

    let newPricePro;

    arrP = {
      companyType: c,
      price: p,
    };

    if (searchPrice) {
      searchPrice.price = p;
      newPricePro = productPrices.filter((price) => price.companyType !== c);
      newPricePro.push(searchPrice);
    } else {
      newPricePro = [...productPrices];
      newPricePro.push(arrP);
    }

    setProductPrices(newPricePro);
  };

  //Funcion que manda los datos:
  const submitRequest = (e) => {
    e.preventDefault();

    // //validación
    // if (
    //   prodName.trim() === "" ||
    //   prodDesc.trim() === "" ||
    //   proCat.trim() === ""
    // ) {
    //   handleError(true);
    //   return;
    // }
    handleError(false);

    if (isNaN(parseInt(proCat))) {
      setProdCat(categorId);
    }

    editProduct(productId, prodDesc, prodName, parseInt(proCat), productPrices)
      .then((res) => {
        console.log("el payload pa actualizar producto es: ", res);
        Swal.fire(
          "Datos Actualizados",
          "Se han actualizados los datos exitosamente",
          "success"
        );
        window.location = "/admin/lista-productos";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text,
        });
      });
  };

  //***** Fin Trabajo de Rony ******//

  //función para traer las categorías
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
        setProdCat(categorId);
        setProdName(name);
        setProdDesc(description);
        setLoading(false);
      })
      .catch((err) => console.log("El error es:", err));
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
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
              placeholder={name}
              onChange={(e) => setProdName(e.target.value)}
              value={prodName}
            />

            <label className="font-weight-bold mt-3">Descripción</label>
            <input
              type="text"
              name="description"
              className="form-control inpt-edit"
              placeholder={description}
              onInput={(e) => setProdDesc(e.target.value)}
              value={prodDesc}
            />

            <label className="font-weight-bold mt-3">Categoria</label>
            <select
              className="form-control inpt-edit"
              onChange={(e) => setProdCat(e.target.value)}
              //value={categorId}
              value={proCat}
            >
              <option value="0">Seleccione una Categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 cl-sm-4">
            {product.prices.map((reg) => (
              <div>
                <label className="font-weight-bold mt-3">
                  Precio {reg.companyDescription}
                </label>
                <input
                  id="emailInput"
                  type="number"
                  name="prices"
                  step="any"
                  className="form-control inpt-edit"
                  placeholder={reg.price}
                  onChange={(e) => getPriceCom(reg.companyId, e.target.value)}
                  //value={}
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
        <button
          type="submit"
          className="row btn btn-lg btn-success btn-changes"
        >
          Guardar Cambios
        </button>
      </form>
    );
  }
};

export default EditProducts;
