import React, {useState} from "react";
import {Button, Card, CardContent} from "@material-ui/core";
import RateAppointment from "./RateAppointment";

const Appointment = (props) => {
  const [openRating, setOpenRating] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({})

  function clickHandler(e){
    const details = e.target.id.split('--');
    setSelectedAppointment({
      appointmentId: details[0],
      doctorId: details[1],
    })
    setOpenRating(true);
  }

  function closeRating(e){
    setOpenRating(false);
  }

  return (
    <div>
      {props.appointmentsList.length === 0 && 'No Appointments Booked'}
      <Card sx={{minWidth: 275}}>
        {props.appointmentsList.map(a => {
              return (
                <Card style={{margin: '20px'}}>
                  <CardContent key={a.appointmentId} id={a.appointmentId}>
                    <h4>Dr: {a.doctorName}</h4>
                    <div>Date: {a.appointmentDate} {a.timeSlot}</div>
                    <div>Symptoms: {a.symptoms}</div>
                    <div>Prior Medical History: {a.priorMedicalHistory}</div>
                  </CardContent>
                  <CardContent>
                    <Button id={a.appointmentId+'--'+a.doctorId} variant="contained" color="primary" size="medium" onClick={clickHandler}>
                      <span id={a.appointmentId+'--'+a.doctorId}>Rate Appointment</span>
                      </Button>
                  </CardContent>
                </Card>
              )})}
      </Card>
      {openRating && <RateAppointment closeRating={closeRating} selectedAppointment={selectedAppointment} userDetails={props.userDetails}/>}
    </div>
  );
}

export default Appointment;