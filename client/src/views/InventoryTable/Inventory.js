import React, { Fragment, useState } from "react";
import OptFilter from "./components/OptFilter";
import InventoryTable from "./components/InventoryTable";
import FilterForm from "./components/FilterForm";

const Inventory = () => {
  //Opcion de filtro:
  const [option, saveOption] = useState("");

  //State para mostrar el otro formulario:
  const [show, handleShow] = useState(false);

  //Funcion que toma el filtro:
  const takeFilter = filter => {
    //console.log("Desde app, la opcion de filtro es: ", filter);
    saveOption(filter);
    if (filter !== " ") {
      if (filter === "0") handleShow(false);
      else handleShow(true);
    } else handleShow(false);
  };

  return (
    <Fragment>
      <OptFilter takeFilter={takeFilter} />
      {show ? <FilterForm option={option} /> : null}
      <InventoryTable />
    </Fragment>
  );
};

export default Inventory;
