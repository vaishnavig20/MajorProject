import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
// components
import Home from "./Components/Home";
import NewForm from "./Components/NewForm";
import PatientRecord from "./Components/PatientRecord";

// images
import MainLogo from "./assets/mainlogo.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const changenamesFunction = async (patient) => {
    console.log(patient);
    let namePair = await window.contract.getNamePair({ patient: patient });
    localStorage.setItem("name1", namePair[0]);
    localStorage.setItem("name2", namePair[1]);
    localStorage.setItem("patient", patient);
    window.location.replace(window.location.href + "PatientRecord");
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={MainLogo}></img> Health Records
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='/NewForm'>New Patient Form</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path='/'>
          <Home changenames={changenamesFunction} />
        </Route>
        <Route exact path='/PatientRecord'>
          <PatientRecord />
        </Route>
        <Route exact path='/NewForm'>
          <NewForm />
        </Route>
      </Switch>
    </Router>
  );
}
