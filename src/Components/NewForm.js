import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewForm = (props) => {
  const Name1 = useRef();
  const Name2 = useRef();

  const Name1Detail = useRef();
  const Name2Detail = useRef();

  const patientRef = useRef();

  const [disableButton, changeDisable] = useState(false);

  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addDetail({
      name: Name1.current.value,
      Detail: Name1Detail.current.value,
    });

    await window.contract.addDetail({
      name: Name2.current.value,
      Detail: Name2Detail.current.value,
    });

    await window.contract.addNamePair({
      patient: patientRef.current.value,
      name1: Name1.current.value,
      name2: Name2.current.value,
    });

    await window.contract.addToPatientArray({ patient: patientRef.current.value });

    alert("head back to home page");
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Hospital Name</Form.Label>
          <Form.Control
            ref={Name1}
            placeholder='Enter Hospital Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            ref={Name1Detail}
            placeholder='Enter doctor name'
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control ref={patientRef} placeholder='Enter Patient Name'></Form.Control>
        </Form.Group>
      </Form>

        <Form.Group className='mb-3'>
          <Form.Label>Guardian's Name</Form.Label>
          <Form.Control
            ref={Name2}
            placeholder='Enter Guardian Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-5'>
          <Form.Label>Patient Medical Record</Form.Label>
          <Form.Control
            ref={Name2Detail}
            placeholder='Medical Prescription and Details'
          ></Form.Control>
        </Form.Group>

       

      <Button
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant='primary'
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewForm;
