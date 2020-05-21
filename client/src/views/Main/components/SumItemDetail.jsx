import React from "react";
import { MdRedeem } from "react-icons/md";

const SumItemDetail = ({ data }) => {
  return (
    <li className="list-group-item d-flex flex-row align-items-center">
      <div className="bubble-style primary-color mr-2">
        <MdRedeem className="text-center text-white" size={20} />
      </div>
      <div>
        <span className="text-black font-weight-bold mr-1">Producto: </span>{" "}
        {data.product}
      </div>
      <div className="d-flex justify-content-end">
        <span className="ml-1 text-black font-weight-bold mr-1">
          Cantidad:{" "}
        </span>{" "}
        {data.quantity}
      </div>
    </li>
  );
};

export default SumItemDetail;
