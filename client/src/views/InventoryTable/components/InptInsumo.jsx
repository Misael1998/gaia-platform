import React, { useState } from "react";

const InptInsumo = ({ takeSearch }) => {
  //State para la busqueda:
  const [findIns, handleFindIns] = useState({
    insumo: ""
  });

  //State para el error:
  const [error, handleError] = useState(false);

  const { insumo } = findIns;

  const handleChangeInfo = e => {
    handleFindIns({
      ...findIns,
      [e.target.name]: e.target.value
    });
  };

  const submitIns = e => {
    e.preventDefault();

    //Validacion:
    if (insumo.trim() === "") {
      handleError(true);
      return;
    }
    handleError(false);
  };

  return (
    <form className="login100-form validate-form" onSubmit={submitIns}>
      <span className="login100-form-title2 p-b-25 text-left">
        Filtrado por Insumo
      </span>
      <div className="row r-filter">
        <div className="col-lg-6">
          <div
            className="wrap-input100 validate-input m-b-16"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              className="input100"
              type="text"
              name="insumo"
              placeholder="Nombre Insumo"
              onChange={handleChangeInfo}
              value={insumo}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <span className="lnr lnr-magnifier"></span>
            </span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="container-login100-form-btn">
            <button type="submit" className="login100-form-btn">
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

export default InptInsumo;
