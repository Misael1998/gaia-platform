import React from "react";

const InventoryTable = () => {
  return (
    <div className="">
      <table className="table table-bordered table-dark">
        <thead>
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
        <tbody>
          <tr className="bg-primary">
            <th scope="row">1</th>
            <td>Vodka</td>
            <td>900</td>
            <td>8 botellas</td>
            <td>Simon</td>
            <td>12/01/2020</td>
            <td>Rony</td>
          </tr>

          <tr className="bg-success">
            <th scope="row">2</th>
            <td>Miller Draft</td>
            <td>30</td>
            <td>8 sixs</td>
            <td>Nell prro</td>
            <td>25/21/2020</td>
            <td>SumaPichas(David)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
