import React, {useEffect, useState} from "react";
import {CardContent} from "@material-ui/core";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    padding: '0px'
  },
};

const DoctorDetails = (props) => {
  props = props.details;
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    props.details = '';
  }

  useEffect(() => {
    setIsOpen(true);
  }, [props])

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div style={{background: 'purple', color: 'white', padding: '11px', height: '70px'}}>
        <h3 style={{margin: '0px'}}>Doctor Details</h3>
      </div>
      <CardContent key={props.id} id={props.id}>
        <h4>Dr: {props.firstName} {props.lastName}</h4>
        <div>Total Experience: {props.totalYearsOfExp}</div>
        <div>Speciality: {props.speciality}</div>
        <div>Date of Birth: {props.dob}</div>
        <div>City: {props.address.city}</div>
        <div>Email: {props.emailId}</div>
        <div>Mobile: {props.mobile}</div>
        <div>Rating: {props.rating}</div>
      </CardContent>
    </Modal>
  );
}

export default DoctorDetails;