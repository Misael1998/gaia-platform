import React, { useEffect, useState } from "react";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import Title from "../../../components/Title";
import { FiShoppingBag } from "react-icons/fi";
import { selectSar } from "../../../services/Sar";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import { newProduct } from "../../../services/NewProduct";

const FormProduct = () => {
  //State del formulario
  const [productName, setProductName] = useState("");
  const [productPrices, setProductPrices] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  //   const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [sarType, setSarType] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [price, setPrice] = useState("");

  //State de UI
  const [enableButton, setEnableButton] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //State de data
  const [SARData, setSARData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    selectSar()
      .then((res) => {
        setSARData(res);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire(
          "Error de conexion",
          "Ocurrió un error al conectarse al servidor",
          "error"
        );
        window.location.href = "admin/";
      });
  }, []);

  useEffect(() => {
    if (
      productName.trim() !== "" &&
      productPrices.length !== 0 &&
      productCategory.trim() !== "" &&
      sarType.trim() !== ""
    ) {
      setEnableButton(false);
      return;
    } else {
      setEnableButton(true);
    }
  }, [productName, productPrices, productCategory, sarType]);

  const addPrice = () => {
    if (productPrices.length < 3) {
      if (price !== "" && companyType !== "") {
        setError(false);
        let productPrice;
        const newPrices = [...productPrices];
        productPrice = {
          idCompanyType: companyType,
          price,
        };
        newPrices.push(productPrice);
        setProductPrices(newPrices);
      } else {
        setError(true);
        setErrorMessage("No puede agregar un precio vacio");
        return;
      }
    } else {
      setError(true);
      setErrorMessage("Solo se pueden agregar tres precios como máximo");
    }
  };

  const submitProduct = (e) => {
    e.preventDefault();

    newProduct(
      productName,
      productCategory,
      sarType,
      description,
      productPrices
    )
      .then((res) => {
        Swal.fire(
          "Producto Creado",
          "Se ha añadido un nuevo producto",
          "success"
        );
        setProductName("");
        setProductCategory("");
        setSarType("");
        setDescription("");
        setProductPrices([]);
        setPrice("");
        setCompanyType("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text,
        });
      });
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="limiter m-t-50">
        <div className="m-l-30">
          <Title
            title="Formulario de Productos"
            icon={<FiShoppingBag size={40} />}
          />
        </div>

        <div className="container-login100 p-t-0 container-prod">
          <div className="wrap-login300 p-l-20 p-t-0 p-r-20 p-b-30">
            <form
              className="login100-form validate-form"
              onSubmit={submitProduct}
            >
              {/*Primera Columna*/}
              <div className="col-lg-6">
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Nombre del Producto"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-leaf"></span>
                  </span>
                </div>

                <div className="wrap-input100 validate-input m-b-16">
                  <select
                    className="input100"
                    onChange={(e) => setProductCategory(e.target.value)}
                    value={productCategory}
                  >
                    <option value="0">Seleccione una Categoria</option>
                    <option value="1">Hierbas</option>
                    <option value="2">Verdura</option>
                    <option value="3">Plantas</option>
                  </select>

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-cart"></span>
                  </span>
                </div>

                <div className="wrap-input100 validate-input m-b-16">
                  <select
                    className="input100"
                    onChange={(e) => setSarType(e.target.value)}
                    value={sarType}
                  >
                    <option value="0">Seleccione un tipo de SAR</option>
                    {SARData.map((type) => (
                      <option key={type.idSarTypes} value={type.idSarTypes}>
                        {type.description}
                      </option>
                    ))}
                  </select>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-briefcase"></span>
                  </span>
                </div>
              </div>

              {/*Fin primera Columna*/}

              {/*Segunda Columna*/}
              <div className="col-lg-6">
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    placeholder="Descripcion del Producto"
                    className="input100"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-text-align-justify"></span>
                  </span>
                </div>

                <div className="wrap-input100 validate-input m-b-16">
                  <select
                    className="input100 p-r-0"
                    onChange={(e) => setCompanyType(e.target.value)}
                    value={companyType}
                  >
                    <option value="0">Tipo de Compañia</option>
                    <option value="1">Hotel</option>
                    <option value="2">Restaurante</option>
                    <option value="3">Supermercado</option>
                  </select>

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-apartment m-l-5 p-l-3"></span>
                  </span>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        placeholder="Precio"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <span className="lnr lnr-list"></span>
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-1 p-r-0 p-l-0">
                    <button type="button" onClick={addPrice}>
                      <span className="focus-input100"></span>
                      <span className="symbol-input200">
                        <span className="lnr lnr-plus-circle"></span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <ul className="list-group">
                    {productPrices.length !== 0
                      ? productPrices.map((price) => (
                          <li
                            className="list-group-item"
                            key={price.idCompanyType}
                          >
                            Tipo de compañia : {` ${price.idCompanyType}`}
                            <span className="ml-4">
                              Precio: {`${price.price}`}
                            </span>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
              {/*Fin segunda Columna*/}

              {error ? (
                <p className="alert alert-danger error-p text-white">
                  {errorMessage}
                </p>
              ) : null}

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
                  Registrar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default FormProduct;
