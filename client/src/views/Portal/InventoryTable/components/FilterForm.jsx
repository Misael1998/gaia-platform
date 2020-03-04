import React, { useEffect } from "react";
import InptInsumo from "./InptInsumo";
import InptEmpleado from "./InptEmpleado";
import InptOrden from "./InptOrden";
import InptFechas from "./InptFechas";
import "../../../../styles/FormLog.css";

const FilterForm = ({ option, filterData }) => {
  return (
    <div className="limiter">
      <div className="container-loginFilter">
        <div className="wrap-filter">
          {option === "1" ? (
            <InptInsumo filterData={filterData} />
          ) : option === "2" ? (
            <InptOrden filterData={filterData} />
          ) : option === "3" ? (
            <InptEmpleado filterData={filterData} />
          ) : (
            <InptFechas filterData={filterData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
