import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import RateAppointment from "./RateAppointment";

const Appointment = () => {
  const [appointments, setappointments] = useState([]);

  useEffect(() => {
    // call to API for appointment details
    const res = [
      {
        id: '1',
        doctor: 'Jaspreet Singh',
        date: '2021-08-05',
        symptoms: 'Fever',
        history: 'AIDS'
      },
      {
        id: '2',
        doctor: 'Jaspreet Singh',
        date: '2021-08-05',
        symptoms: 'Fever',
        history: 'AIDS'
      }
    ]
    setappointments(res);
  }, []);

  function clickHandler(e){
    console.log(e);
    return (
      <RateAppointment/>
    )
  }

  return (
    <div>
      <Card sx={{minWidth: 275}}>
        {
          appointments.map(a => {
              return (
                <Card style={{margin: '20px'}}>
                  <CardContent key={a.id} id={a.id}>
                    <h4>Dr: {a.doctor}</h4>
                    <div>Date: {a.date}</div>
                    <div>Symptoms: {a.symptoms}</div>
                    <div>Prior Medical History: {a.history}</div>
                  </CardContent>
                  <CardContent>
                    <Button id={a.id} variant="contained" color="primary" size="medium" onClick={clickHandler}>Rate Appointment</Button>
                  </CardContent>
                </Card>
              )
            }
          )
        }
      </Card>
    </div>
  );
}

export default Appointment;