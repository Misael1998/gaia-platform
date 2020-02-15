import React, { Fragment, useState, useEffect } from "react";
import FormLog from "./components/FormLog";
import FooterLog from "../../components/Layout/FooterLog";

const LogInPage = () => {
  return (
    <Fragment>
      <FormLog />
      <FooterLog />
    </Fragment>
  );
};

export default LogInPage;
