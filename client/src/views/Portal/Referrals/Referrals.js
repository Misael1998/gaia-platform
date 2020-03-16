import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import { FaExchangeAlt } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { getRefferal } from "../../../services/Referrals";
import Spinner from "../../../components/Spinner";
import moment from "moment";

const Referrals = () => {
  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [loading, setLoading] = useState(true);

  //State para la tabla filtrada:
  const [filteredReferral, handleFilteredReferral] = useState([]);

  //State para la tabla:
  const [regReferral, handleRegReferral] = useState([]);

  //Funcion para traer la info:
  useEffect(() => {
    getRefferal()
      .then(res => {
        handleRegReferral(res);
        handleFilteredReferral(res);
        setLoading(false);
      })
      .catch(err => console.log("El error es:", err));
  }, []);

  //Funcion para el filtrado por numero de orden:
  const filtradoOrden = () => {
    let filteredArray;
    let regex;

    regex = new RegExp(filterValue, "i");
    filteredArray = regReferral.filter(item => {
      if (regex.test(item.idOrder)) return item;
    });

    console.log("Arreglo Filtrado:", filteredArray);
    handleFilteredReferral(filteredArray);
  };

  //Funcion para el filtrado por empleado:
  const filtradoEmpleado = () => {
    let filteredArray;
    let regex;

    regex = new RegExp(filterValue, "i");
    filteredArray = regReferral.filter(item => {
      if (
        regex.test(item.CreatedEmployee) ||
        regex.test(item.SenderEmployee) ||
        regex.test(item.ReceiverEmployee) ||
        regex.test(item.AddresseeEmployee)
      )
        return item;
    });

    console.log("Arreglo Filtrado:", filteredArray);
    handleFilteredReferral(filteredArray);
  };

  //Funcion para el filtrado por fecha:
  const filtradoFecha = () => {
    let filteredArray;

    let fechaI = moment(initialDate);
    let fechaF = moment(finalDate);

    filteredArray = regReferral.filter(item => {
      let fecha = moment(item.emission_date);
      let fecha2 = moment(item.expired_date);
      if (fecha.isBetween(fechaI, fechaF) || fecha2.isBetween(fechaI, fechaF))
        return item;
    });

    console.log("Arreglo Filtrado:", filteredArray);
    handleFilteredReferral(filteredArray);
  };

  let filterInput;
  if (filter !== "") {
    switch (filter) {
      case "0":
        console.log("Se escogio el filtro 0!!!");
        //handleFilteredReferral(regReferral);
        break;

      case "1":
        filterInput = (
          <div className="row">
            <div className="col-lg-9">
              <input
                type="text"
                placeholder="N° de Orden"
                className="form-control"
                onChange={e => setFilterValue(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <button
                type="button"
                onClick={filtradoOrden}
                //onClick={filterData("1")}
                className="btn btn-success"
              >
                Buscar
              </button>
            </div>
          </div>
        );
        break;

      case "2":
      case "3":
        filterInput = (
          <div className="row">
            <div className="col-6">
              Fecha de inicio
              <input
                type="date"
                className="form-control"
                onChange={e => setInitialDate(e.target.value)}
              />
            </div>
            <div className="col-6">
              Fecha fin
              <input
                type="date"
                className="form-control"
                onChange={e => setFinalDate(e.target.value)}
              />
            </div>
            <button
              onClick={filtradoFecha}
              type="button"
              className="btn btn-success mt-3 m-l-250"
            >
              Buscar
            </button>
          </div>
        );
        break;

      case "4":
        filterInput = (
          <div className="row">
            <div className="col-lg-9">
              <input
                type="text"
                placeholder="Nombre del empleado"
                className="form-control"
                onChange={e => setFilterValue(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <button
                onClick={filtradoEmpleado}
                type="button"
                className="btn btn-success"
              >
                Buscar
              </button>
            </div>
          </div>
        );
        break;
    }
  }

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="row p-5">
        <Title title="Remisiones" icon={<FaExchangeAlt size={40} />} />
        <div className="col-6 mt-4">
          <select
            className="form-control"
            onChange={e => setFilter(e.target.value)}
          >
            <option value="0">Seleccione un filtro</option>
            <option value="1">N° de Orden</option>
            <option value="2">Fecha de emision</option>
            <option value="3">Fecha de expiracion</option>
            <option value="4">Nombre de empleado</option>
          </select>
        </div>
        <div className="col-6 mt-4">{filter !== "" ? filterInput : null}</div>
        <div className="offset-10 col-2 mt-4">
          <button className="btn btn-large btn-success">
            <MdPrint className="mr-2" /> Imprimir
          </button>
        </div>
        <div className="col-12 mt-2">
          <table className="table table-bordered table-striped">
            <thead className="primary-color text-white">
              <tr>
                <th scope="col">N° de Orden</th>
                <th scope="col">Fecha Emision</th>
                <th scope="col">Fecha de expiración</th>
                <th scope="col">Empleado solicitante</th>
                <th scope="col">Empleado receptor</th>
                <th scope="col">Empleado que envía</th>
                <th scope="col">Empleado que hizo la orden</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredReferral.map(reg => (
                <tr key={reg.idRefferal} className="">
                  <th scope="row">{reg.idOrder}</th>
                  <td>{reg.emission_date}</td>
                  <td>{reg.expired_date}</td>
                  <td>{reg.AddresseeEmployee}</td>
                  <td>{reg.ReceiverEmployee}</td>
                  <td>{reg.SenderEmployee}</td>
                  <td>{reg.CreatedEmployee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Referrals;
