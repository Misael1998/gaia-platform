import React, { useState } from "react";

const OptFilter = ({ takeFilter }) => {
  //State para leer el select:
  const [infoSelec, handleInfoSelec] = useState({
    filter: ""
  });

  //State para el error:
  const [error, handleError] = useState(false);

  //Extrayendo el valor:
  const { filter } = infoSelec;

  //Funcion que se ejecuta cuando se selecciona un filtro:
  const handleSelect = e => {
    handleInfoSelec({
      ...infoSelec,
      [e.target.name]: e.target.value
    });
  };

  //Funcion para el boton
  const submitFilter = e => {
    e.preventDefault();

    //Validacion:
    if (filter === "0") {
      takeFilter(filter);
      handleError(true);
      return;
    }

    handleError(false);

    //Pasando el filtro:
    takeFilter(filter);

    // console.log(filter);
  };

  return (
    <div className="limiter">
      <div className="container-loginFilter">
        <div className="wrap-filter">
          <form className="login100-form validate-form" onSubmit={submitFilter}>
            <span className="login100-form-title p-b-25 text-left">
              Filtrar en la Tabla de Inventario
            </span>
            <div className="row r-filter">
              <div className="col-lg-6">
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Password is required"
                >
                  <select
                    className="input100"
                    type="number"
                    name="filter"
                    onChange={handleSelect}
                    value={filter}
                  >
                    <option value="0">Filtrar por</option>
                    <option value="1">Nombre Insumo</option>
                    <option value="2">N° Orden</option>
                    <option value="3">Empleado Recibio</option>
                    <option value="4">Rango Fechas</option>
                  </select>

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-list"></span>
                  </span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Filtrar
                  </button>
                </div>
              </div>

              {error ? (
                <p className="alert alert-danger error-p text-white">
                  Seleccione un filtro valido
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OptFilter;
