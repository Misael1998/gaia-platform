import React, { useEffect, useState } from "react";
import Spinner from "../../../../components/Spinner";
import { getInventory } from "../../../../services/Inventory";

const InventoryTable = () => {
  //State para el inventario:
  const [regInventory, handleRegInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  //Funcion para traer la info del inventario:
  useEffect(() => {
    getInventory()
      .then(res => {
        handleRegInventory(res);
        setLoading(false);
      })
      .catch(err => console.log("El error es:", err));
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
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
              <tr key={registro.No_Orden} className="">
                <th scope="row">{registro.No_Orden}</th>
                <td>{registro.Supplie_Name}</td>
                <td>{registro.unit_price}</td>
                <td>{registro.quantity}</td>
                <td></td>
                <td>{registro.emission_date}</td>
                <td>{registro.Receiver_Employee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default InventoryTable;
