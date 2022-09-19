import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [PatientList, changePatientList] = useState([]);

  useEffect(() => {
    const getPatients = async () => {
      changePatientList(await window.contract.getAllPatients());
      console.log(await window.contract.getAllPatients());
    };
    getPatients();
  }, []);

  return (
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {PatientList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <Button onClick={() => props.changenames(el)}>
                    Prescription page
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
