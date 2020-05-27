import React, { useState, useEffect } from "react";
import SessionStorageService from "../../../services/Storage";
import CompanyProfile from "./CompanyProfile";
import IndividualProfile from "./IndividualProfile";

const Profile = () => {
  //State para cargar el perfil si es normal o empresarial:
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    let rol;

    rol = SessionStorageService.getItem("role");

    if (rol === "individual") {
      setProfile(true);
    } else {
      setProfile(false);
    }
  }, []);

  return <div>{profile ? <IndividualProfile /> : <CompanyProfile />}</div>;
};

export default Profile;
