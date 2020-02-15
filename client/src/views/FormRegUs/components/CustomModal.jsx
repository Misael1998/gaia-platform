import React from "react";
import { Modal } from "react-bootstrap";
const CustomModal = ({ showModal, onChange }) => {
  return (
    <Modal
      show={showModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='primary-color'>
        <Modal.Title className='text-white'  id="contained-modal-title-vcenter">
          Registro de usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-gray'>
        <h5 className='text-center mt-2 mb-4' >Seleccione que cuenta deseas crear</h5>
        <div>
         <div className="col-12 radio-user">
         <label>
            <input
              type="radio"
              className="mr-2"
              name="users"
              value="Cliente personal"
              onChange={onChange}
            />
            Cliente Personal
          </label>
         </div>
          <div className="col-12 radio-user">
          <label>
            <input
              type="radio"
              className="mr-2"
              name="users"
              value="Cliente empresarial"
              onChange={onChange}
            />
            Cliente Empresarial
          </label>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
