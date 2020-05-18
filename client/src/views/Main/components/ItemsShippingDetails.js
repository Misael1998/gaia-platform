import React from "react";
import "../../../../src/styles/util.css";
import SumItemDetail from "../components/SumItemDetail";
import moment from "moment";

const ItemsShippingDetails = ({ data, reorder, role }) => {
  return (
    <div className="container containerShipping">
      {!reorder ? (
        <div className="p-3">
          <div className="Left mt-3">
            <span className="text-black font-weight-bold mb-4">
              Número de orden: {data.idRequest}{" "}
            </span>
          </div>

          <div className="Left">
            <span className="text-black Left font-weight-bold mb-4">
              Fecha del pedido:
              {moment(data.emissionDate).format("DD/MM/YYYY")}
            </span>
          </div>
          {role === "employee" ? (
            <div className="Left">
              <span className="text-black Left font-weight-bold mb-4">
                Cliente:
                {data.client}
              </span>
            </div>
          ) : null}
          <div className="Left">
            <span className="text-black Left font-weight-bold mb-4">
              Subtotal: LPS. {data.subtotal}
            </span>
          </div>
        </div>
      ) : null}
      <div className="Left mb-3 p-3">
        <span className="text-black Left font-weight-bold mb-4">
          Detalle del pedido:{" "}
        </span>
      </div>
      <div className="col-12">
        <div className={!reorder ? "ContainerDetail" : "mt-1"}>
          <div className="col-12 mb-3">
            <ul className="list-group">
              {data.products.map((info) => (
                <SumItemDetail
                  key={`${info.idRequest}-${info.product}`}
                  data={info}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsShippingDetails;
