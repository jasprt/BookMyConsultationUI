import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {Button, CardContent, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import axios from "axios";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    padding: '0px'
  },
};

const BookAppointment = (props) => {
  const loginUser = props.loginUser;
  props = props.details;
  const fullName = props.firstName + ' ' + props.lastName;
  const date = new Date().toISOString().split('T')[0];

  const [modalIsOpen, setIsOpen] = useState(false);
  const [timeSlot, settimeSlot] = React.useState('NONE');
  const [dateSlot, setDateSlot] = React.useState(date);
  const [history, sethistory] = React.useState('');
  const [symptoms, setsymptoms] = React.useState('');
  const timeSlots = ['NONE', '11AM-12PM', '12PM-1PM', '1PM-2PM', '2PM-3PM', '3PM-4PM', '4PM-5PM', '5PM-6PM', '6PM-7PM'];


  function closeModal() {
    setIsOpen(false);
    props.details = '';
    settimeSlot('NONE');
  }

  const handleTimeSlotChange = (event) => {
    document.getElementById('time-valid').innerText = '';
    settimeSlot(event.target.value);
  };

  useEffect(() => {
    setIsOpen(true);
  }, [props])

  function submitBookAppointment(event) {
    event.preventDefault();

    if (timeSlot === 'NONE'){
      document.getElementById('time-valid').innerText = 'Select a time slot';
      return;
    }

    const data = {
      doctorId: props.id,
      doctorName: props.firstName+' '+props.lastName,
      userId: loginUser.id,
      userName: loginUser.firstName +' '+loginUser.lastName,
      userEmailId: loginUser.id,
      timeSlot: timeSlot,
      appointmentDate: dateSlot,
      symptoms: symptoms,
      priorMedicalHistory: history
    };

    const auth = "Bearer " + loginUser.accessToken;
    axios.post("http://localhost:8080/appointments", data, {headers: {'Authorization': auth}}
    ).then((resp) => {
      if (resp.status === 200) {
        console.log("Booked appointment", resp.data);
        document.getElementById('booking-success').innerText = 'Appointment Booking Successful';
        setTimeout(() => {
          document.getElementById('booking-success').innerText = '';
          closeModal();
        }, 2000);
      }
    }).catch((err) => {
      console.log(err.response.data);
      alert(err.response.data.message);
    })
  }

  function handleDateChange(event) {
    setDateSlot(event.target.value)
  }

  function handleSymptomsChange(event){
    setsymptoms(event.target.value);
  }

  function handleHistoryChange(event){
    sethistory(event.target.value);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <CardContent key={props.id} id={props.id}>
        <div style={{background: 'purple', color: 'white', padding: '11px', height: '70px', display: 'flex', alignItems: 'center'}}>
          <h3 style={{margin: '0px'}}>Book an Appointment</h3>
        </div>
        <br/>
        <form id="login" autoComplete="off" onSubmit={submitBookAppointment}>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="doctorname">Doctor Name</InputLabel>
            <Input id="doctorname" value={fullName}/>
          </FormControl>
          <br/>
          <br/>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="date">Date picker in line</InputLabel>
            <Input id="date" type={'date'} value={dateSlot} onChange={handleDateChange}/>
          </FormControl>
          <br/>
          <br/>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="time">Time Slot</InputLabel>
            <Select
              id="time"
              value={timeSlot}
              onChange={handleTimeSlotChange}
              style={{width: '150px'}}
            >
              {timeSlots.map((e, key) => {
                return <MenuItem key={key} value={e}>{e}</MenuItem>;
              })}
            </Select>
            <FormHelperText id="time-valid" style={{'color': 'red'}}/>
          </FormControl>
          <br/>
          <br/>
          <FormControl variant="standard">
            <InputLabel htmlFor="history">Medical History</InputLabel>
            <Input id="history" multiline={true} rows={3} onChange={handleHistoryChange}/>
          </FormControl>
          <br/>
          <br/>
          <FormControl variant="standard">
            <InputLabel htmlFor="symptoms">Symptoms</InputLabel>
            <Input id="symptoms" multiline={true} rows={3} onChange={handleSymptomsChange}/>
          </FormControl>
          <br/>
          <br/>
          <Button variant="contained" color="primary" size="medium" type="submit">Book Appointment</Button>
          <br/>
          <span id={'booking-success'} style={{color: 'green'}}/>
        </form>
      </CardContent>
    </Modal>
  );
}

export default BookAppointment;