import React, { Fragment, useState } from "react";
import OptFilter from "./components/OptFilter";
import InventoryTable from "./components/InventoryTable";
import FilterForm from "./components/FilterForm";
import Title from "../../../components/Title";
import { FaTable } from "react-icons/fa";

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
      <div className="row p-5">
        <Title icon={<FaTable size={40} />} title="Inventario" />
        <div className="col-12">
          <OptFilter takeFilter={takeFilter} />
          {show ? <FilterForm option={option} /> : null}
          <InventoryTable />
        </div>
      </div>
    </Fragment>
  );
};

export default Inventory;
