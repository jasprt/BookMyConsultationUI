import React from "react";
import {Button, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import axios from "axios";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";
import StarIcon from "@material-ui/icons/Star";

const DoctorList = (props) => {
  const [selectedSpeciality, setSelectedSpeciality] = React.useState('');
  const [doctorDetails, setDoctorDetails] = React.useState('');
  const [bookAppointment, setbookAppointment] = React.useState('');

  function handleBookAppointment(event) {
    if (event.target.id !== '' && props.loginUser !== null)
      axios.get('http://localhost:8080/doctors/' + event.target.id)
        .then(resp => {
          setbookAppointment(resp.data);
        }).catch(err => {
        console.log(err);
      })
    else
      props.openModal();
  }

  function handleDoctorDetails(event) {
    if (event.target.id !== '')
      axios.get('http://localhost:8080/doctors/' + event.target.id)
        .then(resp => {
          setDoctorDetails(resp.data);
        }).catch(err => {
        console.log(err);
      })
  }

  const handleSpecialityChange = (event) => {
    setSelectedSpeciality(event.target.value);
  };

  const ratings = (doc) => {
    let stars = []
    for (let i = 0; i < doc.rating; i++) {
      stars.push(<StarIcon style={{color: 'gold'}}/>);
    }
    return stars;
  }

  return (
    <div>
      <h4>Select Speciality</h4>
      <Select
        id="select-speciality"
        value={selectedSpeciality}
        label="Speciality"
        onChange={handleSpecialityChange}
        style={{'width': '15%'}}
      >
        {props.speciality.map((e, key) => {
          return <MenuItem key={key} value={e}>{e}</MenuItem>;
        })}
      </Select>
      <br/>
      <br/>
      {props.doctorsList.map(doc => {
        const fullName = doc.firstName + ' ' + doc.lastName;
        if (doc.speciality === selectedSpeciality || selectedSpeciality === '' || selectedSpeciality === 'ANY') {
          return (
            <div style={{'width': '40%', 'margin': 'auto', marginBottom: '10px'}}>
              <Paper elevation={5}>
                <Typography component="div" style={{padding: 10, textAlign: 'left'}}>
                  <h3>Doctor Name: {doc.firstName} {doc.lastName}</h3>
                  <span style={{fontSize: '16px'}}>Speciality: {doc.speciality}</span>
                  <br/>
                  <span style={{fontSize: '16px'}}>Rating:</span>
                    &nbsp;
                    <span>{ratings(doc)}</span>
                  <br/>
                  <span style={{'width': '100%'}}>
                    <Button
                      variant="contained"
                      color={'primary'}
                      style={{'width': '40%', margin: '10px'}}
                      onClick={handleBookAppointment}
                    >
                      <span id={doc.id} fullName={fullName}>Book Appointment</span>
                    </Button>
                    <Button
                      variant="contained"
                      color={'secondary'}
                      style={{'background': 'green', 'width': '40%', margin: '10px'}}
                      id={doc.id}
                      onClick={handleDoctorDetails}
                    >
                      <span id={doc.id}>View Details</span>
                    </Button>
                  </span>
                </Typography>
              </Paper>
            </div>
          )
        }
      })}
      {doctorDetails !== '' ? <DoctorDetails details={doctorDetails}/> : null}
      {bookAppointment !== '' && props.loginUser !== null? <BookAppointment details={bookAppointment} loginUser={props.loginUser}/> : props.openModal}
    </div>
  );
}

export default DoctorList;