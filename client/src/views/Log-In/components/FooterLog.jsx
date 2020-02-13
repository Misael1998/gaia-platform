import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../style/FooterLog.css";

const FooterLog = () => {
  return (
    <footer className="page-footer font-small main-footerlog pt-4">
      <div className="container text-center text-md-left">
        <div className="row">
          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">
              Footer Content
            </h5>
            <p>Contenido del footer</p>
          </div>

          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">Link</h5>
            <p>Link 1</p>
          </div>

          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">Link</h5>
            <p>Link 1</p>
          </div>

          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">Link</h5>
            <p>Link 1</p>
          </div>
        </div>

        <hr />

        <div className="row">
          <ul className="list-unstyled list-inline text-center ml-2">
            <li className="list-inline-item">
              <a className="btn-floating btn-fb mx-1">
                <FaFacebook size={26} className="mr-2" />
                Facebook
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1">
                <FaTwitter size={26} className="mr-2" /> Twitter
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-gplus mx-1">
                <FaInstagram size={26} className="mr-2" />
                Instagram
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-li mx-1">
                <FaLinkedin size={26} className="mr-2" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <hr />

        <div className="row">
          <div class="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="#"> Link to home</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLog;
