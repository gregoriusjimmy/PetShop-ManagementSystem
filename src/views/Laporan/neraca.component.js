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

const Neraca = ({ tgl_laporan }) => {
  return (
    <Card>
      <CardBody>
        <Jumbotron>
          <h1 className="display-3">Neraca!</h1>
          <p className="lead">{`Periode ${tgl_laporan}`}</p>
          <hr className="my-2" />
          <p>
            It uses utility classes for typgraphy and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
      </CardBody>
    </Card>
  );
};

export default Neraca;
