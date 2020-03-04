import React, { useState } from "react";

const InptOrden = ({ filterData }) => {
  //State para la busqueda:
  const [findOrder, handleFindOrder] = useState({
    numOrden: ""
  });

  //State para el error:
  const [error, handleError] = useState(false);

  const { numOrden } = findOrder;

  const handleChangeInfo = e => {
    handleFindOrder({
      ...findOrder,
      [e.target.name]: e.target.value
    });
  };

  const submitOrder = e => {
    e.preventDefault();

    //Validacion:
    if (numOrden.trim() === "") {
      handleError(true);
      return;
    }
    handleError(false);

    filterData(numOrden);
  };

  return (
    <form className="login100-form validate-form" onSubmit={submitOrder}>
      <span className="login100-form-title2 p-b-25 text-left">
        Filtrado por N° de Orden
      </span>
      <div className="row r-filter">
        <div className="col-lg-6">
          <div
            className="wrap-input100 validate-input m-b-16"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              className="input300"
              type="text"
              name="numOrden"
              placeholder="N° de Orden"
              onChange={handleChangeInfo}
              value={numOrden}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <span className="lnr lnr-magnifier"></span>
            </span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="container-login100-form-btn">
            <button type="submit" className="login100-form-btn2">
              Buscar
            </button>
          </div>
        </div>
        {error ? (
          <p className="alert alert-danger error-p text-white">
            El campo no puede estar vacio
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default InptOrden;
