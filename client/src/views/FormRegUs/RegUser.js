import React, { Fragment, useState, useEffect } from "react";
import FormUser from "./components/FormUser";
import FooterLog from "../../components/Layout/FooterLog";
import FormCompany from "./components/FormCompany";
import CustomModal from "./components/CustomModal";

const RegUser = () => {
  const [modalShow, setModalShow] = useState(true);
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  const onChange = e => {
    if (e.target.value === "Cliente personal") {
      setUser("user");
    } else {
      setUser("company");
    }

    setModalShow(false);
  };

  return (
    <Fragment>
      <CustomModal showModal={modalShow} onChange={onChange} />

      {user !== "" ? user === "user" ? <FormUser /> : <FormCompany /> : <div className="container-login100 imgFormRegUs"></div>}

      <FooterLog />
    </Fragment>
  );
};

export default RegUser;
