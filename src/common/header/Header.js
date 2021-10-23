import React, {useState} from "react";
import './Header.css'
import logo from './../../assets/logo.jpeg'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [mobile, setmobile] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [accessToken, setaccessToken] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleLogout() {
    setIsLogin(false);
    const auth = "Bearer " + accessToken;
    axios.post("http://localhost:8080/auth/logout", null,{headers: {'Authorization': auth}}
    ).then((resp) => {
      console.log("Log out Resp: ", resp);
      setaccessToken(null);
    }).catch((err) => {
      console.log(err.response.data);
    })  }

  function handleUserChange(e) {
    document.getElementById('username-valid').innerText = '';
    setusername(e.target.value);

  }

  function handlePassChange(e) {
    setpassword(e.target.value);
  }

  function submitLogin(event) {
    event.preventDefault();
    console.log(username, password);
    const format = /^\w+([-]?\w+)*@\w+([-]?\w+)*/;
    if (!username.match(format)) {
      document.getElementById('username-valid').innerText = 'Enter Valid email';
      return;
    }

    const auth = 'Basic ' + btoa(username+':'+password)
    axios.post("http://localhost:8080/auth/login", null,{headers: {'Authorization': auth}}
    ).then((resp) => {
      console.log("Resp: ", resp);
      setaccessToken(resp.data.accessToken);
      document.getElementById('success-login').innerText = 'Login Successful'
      setTimeout(() => {
        closeModal();
        setIsLogin(true);
      }, 2000);
    }).catch((err) => {
      console.log(err.response.data);
      document.getElementById('failed-login').innerText = 'Login Failed: ' + err.response.data.message;
      setTimeout(() => {
        document.getElementById('failed-login').innerText = null;
      }, 2000);
    })
  }

  function handleFirstNameChange(e) {
    setfirstname(e.target.value);
  }

  function handleLastNameChange(e) {
    setlastname(e.target.value);
  }

  function submitRegister(e) {
    e.preventDefault();
    console.log(firstname, lastname, username, password, mobile);
    let flag = true;
    if (mobile.length !== 10) {
      document.getElementById('mobile-valid').innerText = 'Enter Valid mobile number';
      flag = false;
    }
    const format = /^\w+([-]?\w+)*@\w+([-]?\w+)*/;
    if (!username.match(format)) {
      document.getElementById('username-valid').innerText = 'Enter Valid email';
      flag = false;
    }
    if (flag) {
      const data = {
        'firstName': firstname,
        'lastName': lastname,
        'emailId': username,
        'password': password,
        'mobile': mobile,
      }
      axios.post("http://localhost:8080/users/register", data)
        .then(resp => {
          console.log(resp);
          document.getElementById('success-register').innerText = 'Registration Successful';
          setTimeout(() => closeModal(), 2000);
        })
        .catch(err => {
          console.log(err.response.data);
          document.getElementById('failed-register').innerText = 'Registration Failed: ' + err.response.data.message;
          setTimeout(() => {
              document.getElementById('failed-register').innerText = null;
            }
          , 2000);
        })
    }
  }

  function handleNumberChange(e) {
    document.getElementById('mobile-valid').innerText = '';
    setmobile(e.target.value);
  }

  return (
    <div className="main-header-container">
      <img src={logo} alt="logo loading..."/>
      &nbsp;&nbsp;
      <span id="header-title"> Doctor Finder </span>
      <Button
        id="session-btn"
        variant="contained"
        color={isLogin ? "secondary" : "primary"}
        size="medium"
        onClick={() => {
          if (isLogin)
            handleLogout();
          else
            openModal();
        }}
      >
        {isLogin ? "Logout" : "Login"}
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login"/>
          <Tab label="Register"/>
        </Tabs>

        <TabPanel value={value} index={0}>
          <Card sx={{minWidth: 275}}>
            <CardContent>
              <form id="login" autoComplete="off" style={{'text-align': 'center'}} onSubmit={submitLogin}>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="username">Email</InputLabel>
                  <Input id="username" onChange={handleUserChange}/>
                  <FormHelperText id="username-valid" style={{'color': 'red'}}/>
                </FormControl>
                <br/>
                <br/>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" type="password" onChange={handlePassChange}/>
                </FormControl>
                <br/>
                <br/>
                <Button variant="contained" color="primary" size="medium" type="submit">Login</Button>
                <br/>
                <br/>
                <span id="success-login" style={{'color': 'green'}}/>
                <span id="failed-login" style={{'color': 'red'}}/>
              </form>

            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Card sx={{minWidth: 275}}>
            <CardContent>
              <form id="register" autoComplete="off" style={{'text-align': 'center'}} onSubmit={submitRegister}>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="firstname">First Name</InputLabel>
                  <Input id="firstname" onChange={handleFirstNameChange}/>
                </FormControl>
                <br/>
                <br/>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="lastname">Last Name</InputLabel>
                  <Input id="lastname" onChange={handleLastNameChange}/>
                </FormControl>
                <br/>
                <br/>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" onChange={handleUserChange}/>
                  <FormHelperText id="username-valid" style={{'color': 'red'}} />
                </FormControl>
                <br/>
                <br/>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" type="password" onChange={handlePassChange}/>
                </FormControl>
                <br/>
                <br/>
                <FormControl variant="standard" required>
                  <InputLabel htmlFor="mobile">Mobile No.</InputLabel>
                  <Input id="mobile" type="number" onChange={handleNumberChange}/>
                  <FormHelperText id="mobile-valid" style={{'color': 'red'}} />
                </FormControl>
                <br/>
                <br/>
                <Button variant="contained" color="primary" size="medium" type="submit">Register</Button>
                <br/>
                <br/>
                <span id="success-register" style={{'color': 'green'}} />
                <span id="failed-register" style={{'color': 'red'}} />
              </form>
            </CardContent>
          </Card>
        </TabPanel>

      </Modal>
    </div>
  );
};

export default Header;
