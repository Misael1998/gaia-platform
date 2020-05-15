import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import { FaExchangeAlt } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { getRefferal } from "../../../services/Referrals";
import Spinner from "../../../components/Spinner";
import moment from "moment";
import PDFView from '../../../components/PDFView'

const Referrals = () => {

  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);
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

    handleFilteredReferral(filteredArray);
  };

  const limpiar = () => {
    handleFilteredReferral(regReferral);
    setFilter("0");
  };

  let filterInput;
  if (filter !== "") {
    switch (filter) {
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
            <div className="col-lg-3 mt-lg-0 mt-md-2 mt-2">
              <button
                type="button"
                onClick={filtradoOrden}
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
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              Fecha de inicio
              <input
                type="date"
                className="form-control"
                onChange={e => setInitialDate(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              Fecha fin
              <input
                type="date"
                className="form-control"
                onChange={e => setFinalDate(e.target.value)}
              />
            </div>
            <div className='col-12 d-flex justify-content-center'>
              <button
                onClick={filtradoFecha}
                type="button"
                className="btn btn-success mt-3"
              >
                Buscar
            </button>
            </div>
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
            <div className="col-lg-3 mt-lg-0 mt-md-2 mt-2">
              <button
                onClick={filtradoEmpleado}
                type="button"
                className="btn btn-success "
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

    if (showPDF) {
      return <PDFView data={regReferral} docTitle={'Remisiones'} />
    } else {
      return (
        <div className="row p-5">
          <Title title="Remisiones" icon={<FaExchangeAlt size={40} />} />
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-4">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                <select
                  id="selectFilter"
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
              <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-lg-0 mt-md-0 mt-2 ">
                <button
                  type="button"
                  onClick={limpiar}
                  className="btn btn-success"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-4">{filter !== "" ? filterInput : null}</div>
          <div className="offset-lg-10 col-lg-2 offset-md-10 col-md-10 col-sm-12 col-12 mt-4">
            <button className="btn btn-large btn-success" onClick={() => setShowPDF(!showPDF)}>
              <MdPrint className="mr-2" /> Imprimir
            </button>
          </div>
          <div className="col-12 mt-2">
            <table className="table table-responsive-sm table-bordered table-striped">
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
                    <td>{moment(reg.emission_date).format('DD/MM/YYYY')}</td>
                    <td>{moment(reg.expired_date).format('DD/MM/YYYY')}</td>
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
  }
};

export default Referrals;
