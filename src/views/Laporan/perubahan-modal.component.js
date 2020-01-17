import React from "react";

import { Card, CardBody, Table, Col, Row, Jumbotron } from "reactstrap";
import { formatMoney } from "../../utils/utils";
const PerubahanModal = ({ data }) => {
  const { modal, laba, prive, modalBaru } = data;
  return (
    <Card>
      <CardBody>
        <Jumbotron>
          <h4 className="display-3">Perubahan Modal</h4>
          <hr className="my-2" />
          <Row>
            <Col>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Modal</td>
                    <td>{`Rp${formatMoney(modal)}`}</td>
                  </tr>
                  <tr>
                    <td>Laba</td>
                    <td>{`Rp${formatMoney(laba)}`}</td>
                  </tr>
                  <tr>
                    <td>Prive</td>
                    <td>{`Rp${formatMoney(prive)}`}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <hr className="my-2" />
          <Row>
            <Col>
              <h5>Modal Baru: </h5>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <h5>{`Rp${formatMoney(modalBaru)}`}</h5>
            </Col>
          </Row>
        </Jumbotron>
      </CardBody>
    </Card>
  );
};
export default PerubahanModal;
