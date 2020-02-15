import React, { Fragment, useState, useEffect } from "react";
import FormUser from "./components/FormUser";
import FooterLog from "./components/FooterLog";
import FormCompany from "./components/FormCompany";

const LogInPage = () => {
  return (
    <Fragment>
      {/* <FormUser /> */}
      <FormCompany />
      <FooterLog />
    </Fragment>
  );
};

export default LogInPage;
