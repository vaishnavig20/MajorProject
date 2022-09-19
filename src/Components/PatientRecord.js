import React, { useState, useEffect } from "react";
import { Container, Row, Col,Card } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PatientRecord = (props) => {
  const [name1Detail, changename1Detail] = useState(LoadingCircles);
  const [name2Detail, changename2Detail] = useState(LoadingCircles);
  const [Patient, changePatient] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
     

      changename1Detail(
        await window.contract.getDetail({
          name: localStorage.getItem("name1"),
        })
      );
      changename2Detail(
        await window.contract.getDetail({
          name: localStorage.getItem("name2"),
        })
      );

      changePatient(localStorage.getItem("patient"));

     
    };

    getInfo();
  }, []);

  
     

  return (
    <Container>
      <Row>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1vw",
                  width:'35 rem'
                }}
              >
              <Card >
                <Card.Body>
                  <Card.Title>{Patient}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Doctor's Name: {name1Detail} </Card.Subtitle>
                  <Card.Text> 
                    The prescription given by {name1Detail} is given below
                  </Card.Text>
                  <Card.Text> 
                    {name2Detail}
                  </Card.Text>
                  
                </Card.Body>
              </Card>
                
              </div>
            </Row>
            
          </Container>
        </Col>
         
          
      </Row>
    </Container>
  );
};

export default PatientRecord;
