import React from "react";
import {
  Card,
  CardBody,
  // Table,
  Col,
  Row,
  Button,
  // Form,
  // FormGroup,
  Jumbotron,
  Label,
  Input,
  CardHeader
} from "reactstrap";

const LaporanRugiLaba = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <Jumbotron>
          <h1 className="display-3">Neraca</h1>

          <hr className="my-2" />
          <Row>
            <Col>
              <h5>Aktiva</h5>
            </Col>
            <Col></Col>
          </Row>
        </Jumbotron>
      </CardBody>
    </Card>
  );
};
export default LaporanRugiLaba;
