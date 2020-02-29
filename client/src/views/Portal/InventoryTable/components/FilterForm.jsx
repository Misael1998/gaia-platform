import React, { useEffect } from "react";
import InptInsumo from "./InptInsumo";
import InptEmpleado from "./InptEmpleado";
import InptOrden from "./InptOrden";
import InptFechas from "./InptFechas";
import "../../../../styles/FormLog.css";

const FilterForm = ({ option }) => {
  return (
    <div className="limiter">
      <div className="container-loginFilter">
        <div className="wrap-filter">
          {option === "1" ? (
            <InptInsumo />
          ) : option === "2" ? (
            <InptOrden />
          ) : option === "3" ? (
            <InptEmpleado />
          ) : (
            <InptFechas />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
