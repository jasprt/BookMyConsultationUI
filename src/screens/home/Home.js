import React from "react";
import Header from "../../common/header/Header"
import {Box, Tab, Tabs, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import Appointment from "../appointment/Appointment";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className="main-home-container">
      <Header />

      <Tabs value={value} onChange={handleChange} variant="fullWidth" textColor="primary">
        <Tab label="Doctors"/>
        <Tab label="Appointment"/>
      </Tabs>

      <TabPanel value={value} index={0} style={{'text-align': 'center'}}>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {document.getElementById("session-btn") === null? '' :
          document.getElementById("session-btn").innerText === 'LOGIN'?
          <span>Login to see appointments</span> : <Appointment />
        }
      </TabPanel>
    </div>
  );
};

export default Home;
