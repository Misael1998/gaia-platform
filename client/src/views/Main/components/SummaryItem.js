import React from "react";
import { MdRedeem } from "react-icons/md";

const SummaryItem = ({ name, quantity, price }) => {
  return (
    <li className="list-group-item d-flex flex-row align-items-center">
      <div className="bubble-style primary-color mr-2">
        <MdRedeem className="text-center text-white" size={20} />
      </div>
      <div className="col-5 p-0">
        <span className="text-black font-weight-bold">Producto: </span> {name}
      </div>
      <div className="col-3 p-0">
        <span className="text-black font-weight-bold ml-2">Cantidad: </span>{" "}
        {quantity}
      </div>
      <div className="col-3 p-0">
        <span className="text-black font-weight-bold ml-2">Precio: </span>{" "}
        {price}
      </div>
    </li>
  );
};

export default SummaryItem;
