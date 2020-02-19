import React, { Fragment, useState } from "react";
import FormUser from "./components/FormUser";
import FooterLog from "../../components/Layout/FooterLog";
import FormCompany from "./components/FormCompany";
import CustomModal from "./components/CustomModal";

const RegUser = ({ history }) => {
  const [modalShow, setModalShow] = useState(true);
  const [user, setUser] = useState("");


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

      {user !== "" ? user === "user" ? <FormUser history={history} /> : <FormCompany history={history} /> : <div className="container-login100 imgFormRegUs"></div>}

      <FooterLog />
    </Fragment>
  );
};

export default RegUser;
