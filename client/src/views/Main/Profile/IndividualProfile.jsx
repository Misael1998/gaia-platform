import React, { useState } from "react";

import Title from "../../../components/Title";

import Edit from "./components/Edit";

import NoneEdit from "./components/NoneEdit";

import { IoIosPerson } from "react-icons/io";

import "../../../styles/util.css";


const IndividualProfile = () => {

  //State para alternar entre modo editar y ver info:

  const [goEdit, setGoEdit] = useState(false);


  //State para guardar los datos que vienen de la BD:

  const [data, setData] = useState({

    name: "Pizza Hut",

    email: "pizza@gmail.com",

    phone: "98351410",

    address: "Col. Residencial C.A",

    contactName: "Maria",

    contactNumber: "99887766"

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

        {goEdit ? <Edit data={data} /> : <NoneEdit data={data} />}


        <div className="row justify-content-center mt-4">

          <button

            onClick={goToInfo}

            type="button"

            className="btn btn-lg btn-success btn-perfil m-r-10"

          >

            Ver Perfil

          </button>


          <button

            onClick={goToEdit}

            type="button"

            className="btn btn-lg btn-success btn-edit m-l-10"

          >

            Editar Información

          </button>

        </div>

      </div>

    </div>

  );

};


export default IndividualProfile;