import React, { Fragment, useState, useEffect } from "react";
import OptFilter from "./components/OptFilter";
import InventoryTable from "./components/InventoryTable";
import FilterForm from "./components/FilterForm";
import Title from "../../../components/Title";
import { getInventory } from "../../../services/Inventory";
import { FaTable } from "react-icons/fa";
import Spinner from "../../../components/Spinner";
import moment from "moment";

const Inventory = () => {
  //Opcion de filtro:
  const [option, saveOption] = useState("");

  //State para mostrar el otro formulario:
  const [show, handleShow] = useState(false);

  //State para la tabla filtrada:
  const [filteredInventory, handleFilteredInventory] = useState([]);

  //State para el inventario:
  const [regInventory, handleRegInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  //Funcion que toma el filtro:
  const takeFilter = filter => {
    //console.log("Desde app, la opcion de filtro es: ", filter);
    saveOption(filter);
    if (filter !== " ") {
      if (filter === "0") handleShow(false);
      else handleShow(true);
    } else handleShow(false);
  };

  //Funcion para el filtrado
  const filterData = filtro => {
    let filterArray;
    let regex;

    if (filtro === "0") {
      filterArray = regInventory;
    } else {
      switch (option) {
        case "1":
          console.log("Filtro de num orden: ", filtro);
          regex = new RegExp(filtro, "i");
          filterArray = regInventory.filter(item => {
            if (regex.test(item.Supplie_Name)) return item;
          });
          console.log("El arreglo filtrado es: ", filterArray);
          break;

        case "2":
          console.log("Filtro de num orden: ", filtro);
          let numConvert = parseInt(filtro);
          filterArray = regInventory.filter(item => {
            console.log(typeof item.No_Orden);
            console.log(typeof numConvert);
            if (item.No_Orden === numConvert) return item;
          });
          console.log("El arreglo filtrado es: ", filterArray);
          break;

        case "3":
          console.log("Filtro de num orden: ", filtro);
          regex = new RegExp(filtro, "i");
          filterArray = regInventory.filter(item => {
            if (regex.test(item.Receiver_Employee)) return item;
          });
          console.log("El arreglo filtrado es: ", filterArray);
          break;

        case "4":
          let fechaI = moment(filtro.fechaInicio);
          let fechaF = moment(filtro.fechaFin);
          filterArray = regInventory.filter(item => {
            let fecha = moment(item.emission_date);
            if (fecha.isBetween(fechaI, fechaF)) return item;
          });
          break;
      }
    }

    handleFilteredInventory(filterArray);
  };

  //Funcion para traer la info del inventario:
  useEffect(() => {
    getInventory()
      .then(res => {
        handleRegInventory(res);
        handleFilteredInventory(res);
        setLoading(false);
      })
      .catch(err => console.log("El error es:", err));
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className="row p-5">
          <Title icon={<FaTable size={40} />} title="Inventario" />
          <div className="col-12">
            <OptFilter takeFilter={takeFilter} filterData={filterData} />
            {show ? (
              <FilterForm option={option} filterData={filterData} />
            ) : null}
            <InventoryTable regInventory={filteredInventory} />
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Inventory;
