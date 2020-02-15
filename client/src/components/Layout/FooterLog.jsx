import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/FooterLog.css";

const FooterLog = () => {
  return (
    <footer className="page-footer font-small main-footerlog pt-4">
      <div className="container text-center text-md-left text-white">
        <div className="row">
          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">
              PyFlor
            </h5>
            <p className="">Siempre fresco, siempre saludable</p>
          </div>
        </div>

        <hr />

        <div className="row footer-response">
          <ul className="list-unstyled list-inline text-center ml-2">
            <li className="list-inline-item mr-4">
              <a
                className="btn-floating btn-fb mx-1 text-white"
                href="https://www.facebook.com/Pyflor/"
              >
                <FaFacebook size={26} className="mr-2" />
                Facebook
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className="btn-floating btn-gplus mx-1 text-white"
                href="https://www.instagram.com/pyflorhn/?hl=es-la"
              >
                <FaInstagram size={26} className="mr-2" />
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <hr />

        <div className="row text-center">
          <div className="footer-copyright text-center py-3 ml-2">
            © 2020 Copyright Ingeniería del Software:
            <Link className="text-white ml-2 fs-18" to="/">
              Regresar a la pagina de Inicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLog;
