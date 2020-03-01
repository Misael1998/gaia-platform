import React, { useState } from "react";

const InptFechas = () => {
  //State para la busqueda:
  const [finDates, handleFinDates] = useState({
    fechaInicio: "",
    fechaFin: ""
  });

  //State para el error:
  const [error, handleError] = useState(false);

  const { fechaInicio, fechaFin } = finDates;

  const handleChangeInfo = e => {
    handleFinDates({
      ...finDates,
      [e.target.name]: e.target.value
    });
  };

  const submitDates = e => {
    e.preventDefault();

    //Validacion:
    if (fechaInicio.trim() === "" || fechaFin.trim() === "") {
      handleError(true);
      return;
    }
    handleError(false);
  };

  return (
    <form className="login100-form validate-form" onSubmit={submitDates}>
      <span className="login100-form-title2 p-b-25 text-left">
        Filtrar por rango de fechas
      </span>
      <div className="row r-filter">
        <div className="col-lg-6">
          <div
            className="wrap-input100 validate-input m-b-16"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <label>Fecha Inicio</label>
            <input
              className="input300"
              type="date"
              name="fechaInicio"
              onChange={handleChangeInfo}
              value={fechaInicio}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <span className="lnr lnr-magnifier mt-4"></span>
            </span>
          </div>

          <div
            className="wrap-input100 validate-input m-b-16"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <label>Fecha Fin</label>
            <input
              className="input300"
              type="date"
              name="fechaFin"
              onChange={handleChangeInfo}
              value={fechaFin}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <span className="lnr lnr-magnifier mt-4"></span>
            </span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="container-login100-form-btn">
            <button type="submit" className="login100-form-btn2 mt-6">
              Buscar
            </button>
          </div>
        </div>
        {error ? (
          <p className="alert alert-danger error-p text-white">
            Ambos campos deben estar llenos
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default InptFechas;
