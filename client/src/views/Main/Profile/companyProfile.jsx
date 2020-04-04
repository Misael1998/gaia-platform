import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import Edit from "./components/Edit";
import NoneEdit from "./components/NoneEdit";
import { IoIosPerson } from "react-icons/io";
import { getEnterpriseData } from "../../../services/EnterpriseData";
import Spinner from "../../../components/Spinner";

const CompanyProfile = () => {
  //State para alternar entre modo editar y ver info:
  const [goEdit, setGoEdit] = useState(false);

  const [loading, setLoading] = useState(true);

  //State para guardar los datos que vienen de la BD:
  const [data, setData] = useState({
    company_name: "",
    email: "",
    phone: "",
    address: "",
    contact_name: "",
    contact_number: "",
  });

  useEffect(() => {
    getEnterpriseData()
      .then((res) => {
        setData(res[0]);
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
            title="Perfil de Usuario Empresarial"
          />
        </div>

        <div className="col-md-8 mt-3 containerShipping">
          {goEdit ? <Edit data={data} /> : <NoneEdit data={data} />}

          <div className="row justify-content-center mt-4 mb-4">
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
  }
};

export default CompanyProfile;
