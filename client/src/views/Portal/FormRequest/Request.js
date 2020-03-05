import React, { Fragment } from "react";
import FormRequest from "./components/FormRequest";
import "./style/Request.css";
import Title from "../../../components/Title";
import { FaWpforms } from "react-icons/fa";

const Request = () => {
  return (
    <div className="row p-5">
      <Title icon={<FaWpforms size={40} />} title="Solicitud de compra" />
      <div className="col-12 m-t-0">
        <FormRequest />
      </div>
    </div>
  );
};

export default Request;
