import React from "react";
import moment from 'moment'
const InventoryTable = ({ regInventory }) => {
  return (
    <div className="">
      <table className="table table-bordered table-striped">
        <thead className="primary-color text-white">
          <tr>
            <th scope="col">N° de Orden</th>
            <th scope="col">Nombre Insumo</th>
            <th scope="col">Precio Unitario</th>
            <th scope="col">Cantidad Comprada</th>
            <th scope="col">Excento de Impuestos</th>
            <th scope="col">Fecha Entrada</th>
            <th scope="col">Empleado que Recibio</th>
          </tr>
        </thead>
        <tbody className="">
          {regInventory.map(registro => (
            <tr
              key={`${registro.No_Orden} ${registro.Supplie_Name}`}
              className=""
            >
              <th scope="row">{registro.No_Orden}</th>
              <td>{registro.Supplie_Name}</td>
              <td>{registro.unit_price}</td>
              <td>{registro.quantity}</td>
              <td></td>
              <td>{moment(registro.emission_date).format('DD/MM/YYYY')}</td>
              <td>{registro.Receiver_Employee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
