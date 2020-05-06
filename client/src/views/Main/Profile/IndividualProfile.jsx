import React, { useState, useEffect } from "react";

import Title from "../../../components/Title";

import EditIndividual from "./components/EditIndividual";

import NoneEditIndividual from "./components/NoneEditIndividual";

import { IoIosPerson } from "react-icons/io";

import { getIndividualData } from "../../../services/IndividualData";

import Spinner from "../../../components/Spinner";

import "../../../styles/util.css";

const IndividualProfile = () => {
  //State para alternar entre modo editar y ver info:

  const [goEdit, setGoEdit] = useState(false);

  const [loading, setLoading] = useState(true);

  //State para guardar los datos que vienen de la BD:

  const [data, setData] = useState({
    name: "",

    lastname: "",

    email: "",

    address: "",

    phone: ""
  });

  useEffect(() => {
    getIndividualData()
      .then((res) => {
        setData(res);

        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  //Funcion para editar:

  const goToEdit = () => {
    setGoEdit(true);
  };

  //Funcion para ver info:

  const goToInfo = () => {
    setGoEdit(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
  return (
    <div className="row justify-content-center mt-2">
      <div className="container mt-5">
        <Title
          icon={<IoIosPerson size={40} />}
          title="Perfil de Usuario Individual"
        />
      </div>

      

      <div className="col-md-8 mt-3 containerShipping">
        {goEdit ? (
          <EditIndividual data={data} />
        ) : (
          <NoneEditIndividual data={data} />
        )}

        <div className="row justify-content-center mt-4">
          <button
            onClick={goToInfo}
            type="button"
            className="btn btn-lg btn-success btn-perfil m-r-10 mb-4"
          >
            Ver Perfil
          </button>

          <button
            onClick={goToEdit}
            type="button"
            className="btn btn-lg btn-success btn-edit m-l-10 mb-4"
          >
            Editar Información
          </button>
        </div>
      </div>
    </div>
  );
 }
};

export default IndividualProfile;
