import React, { Fragment } from "react";
import FormLog from "./components/FormLog";
import FooterLog from "../../components/Layout/FooterLog";

const LogInPage = ({history}) => {
  return (
    <Fragment>
      <FormLog history={history} />
      <FooterLog />
    </Fragment>
  );
};

export default LogInPage;
