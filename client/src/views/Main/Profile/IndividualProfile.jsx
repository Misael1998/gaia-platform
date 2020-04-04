import React, { useState } from "react";

import Title from "../../../components/Title";

import EditIndividual from "./components/EditIndividual";

import NoneEditIndividual from "./components/NoneEditIndividual";

import { IoIosPerson } from "react-icons/io";

import "../../../styles/util.css";

const IndividualProfile = () => {
  //State para alternar entre modo editar y ver info:

  const [goEdit, setGoEdit] = useState(false);

  //State para guardar los datos que vienen de la BD:

  const [data, setData] = useState({
    name: "Dave",

    email: "flores23@gmail.com",

    address: "Residencial Santa Cruz",

    phone: "96882367"
  });

  //Funcion para editar:

  const goToEdit = () => {
    setGoEdit(true);
  };

  //Funcion para ver info:

  const goToInfo = () => {
    setGoEdit(false);
  };

  return (
    <div className="row justify-content-center mt-2">
      <div className="container mt-5">
        <Title
          icon={<IoIosPerson size={40} />}
          title="Perfil de Usuario Normal"
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
};

export default IndividualProfile;
