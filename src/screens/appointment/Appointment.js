import React from "react";
import {Button, Card, CardContent} from "@material-ui/core";
import RateAppointment from "./RateAppointment";

const Appointment = (props) => {
  console.log('Appointments',props);
  function clickHandler(e){
    console.log(e);
    return (
      <RateAppointment/>
    )
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
                    <Button id={a.id} variant="contained" color="primary" size="medium" onClick={clickHandler}>Rate Appointment</Button>
                  </CardContent>
                </Card>
              )})}
      </Card>
    </div>
  );
}

export default Appointment;