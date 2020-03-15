import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import { FaExchangeAlt } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { getRefferal } from "../../../services/Referrals";
import Spinner from "../../../components/Spinner";

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

  let filterInput;
  if (filter !== "") {
    switch (filter) {
      case "1":
        filterInput = (
          <input
            type="text"
            placeholder="N° de Orden"
            className="form-control"
            onChange={e => setFilterValue(e.target.value)}
          />
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
          </div>
        );
        break;
      case "4":
        filterInput = (
          <input
            type="text"
            placeholder="Nombre del empleado"
            className="form-control"
            onChange={e => setFilterValue(e.target.value)}
          />
        );
        break;
    }
  }

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
              {/* {filteredReferral.map(reg => (
                <tr key={reg.numOrden} className="">
                  <th scope="row">{reg.numOrden}</th>
                  <td>{reg.fechaEmision}</td>
                  <td>{reg.fechaExpiracion}</td>
                  <td>{reg.empSolicitante}</td>
                  <td>{reg.empReceptor}</td>
                  <td>{reg.empEnvia}</td>
                  <td>{reg.empHizoOrden}</td>
                </tr>
              ))} */}

              <tr className="">
                <th scope="row">080819</th>
                <td>15/01/2020</td>
                <td>15/03/2020</td>
                <td>Sergio Martinez</td>
                <td>Nelson Ponce</td>
                <td>Ana Lia Bulnes</td>
                <td>Saul Mendoza</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Referrals;
