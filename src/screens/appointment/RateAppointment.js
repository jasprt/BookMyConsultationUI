import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Button, CardContent, FormControl, FormHelperText, TextField, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import axios from "axios";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%'
  },
};

const RateAppointment = (props) => {
  console.log(props);
  const [comment, setcomment] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = React.useState(0);


  function closeModal() {
    setIsOpen(false);
    props.closeRating();
  }

  useEffect(() => {
    setIsOpen(true);
  }, [props]);

  function submitRateAppointment(event) {
    event.preventDefault();
    if (ratingValue === 0) {
      document.getElementById('rating-fail').innerText = 'Submit a rating';
      return;
    }

    const data = {
      appointmentId: props.selectedAppointment.appointmentId,
      doctorId: props.selectedAppointment.doctorId,
      rating: ratingValue,
      comments: comment,
    }

    const auth = "Bearer " + props.userDetails.accessToken;
    axios.post("http://localhost:8080/ratings", data, {headers: {'Authorization': auth}})
      .then(resp => {
        if (resp.status === 200) {
          document.getElementById('rating-success').innerText = 'Appointment Rated Successfully';
          setTimeout(() => {
            document.getElementById('rating-success').innerText = '';
            closeModal();
          }, 2000)

        }
      }).catch(err => {
      console.log(err.response.data);

    })
  }

  const handleCommentChange = (event) => {
    setcomment(event.target.value);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <CardContent key={props.id} id={props.id}>
        <div style={{
          background: 'purple',
          color: 'white',
          padding: '11px',
          height: '70px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <h3 style={{margin: '0px'}}>Rate an Appointment</h3>
        </div>
        <br/>
        <form id="rate" autoComplete="off" onSubmit={submitRateAppointment}>
          <FormControl variant="standard">
            <TextField id="comments" label="Comments" variant="standard" multiline rows={3}
                       onChange={handleCommentChange}/>
          </FormControl>
          <br/>
          <br/>
          <FormControl variant="standard" required>
            <Typography component="legend">Rating: </Typography>
            <Rating value={ratingValue} onChange={(event, newValue) => {
              setRatingValue(newValue);
              document.getElementById('rating-fail').innerText = '';
            }}/>
            <FormHelperText style={{color: 'red'}} id={'rating-fail'}/>
          </FormControl>
          <br/>
          <br/>
          <Button variant="contained" color="primary" size="medium" type="submit">Rate Appointment</Button>
          <br/>
          <FormHelperText style={{color: 'green'}} id={'rating-success'}/>

        </form>
      </CardContent>
    </Modal>
  );
}

export default RateAppointment;