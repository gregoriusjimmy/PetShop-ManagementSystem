import React from "react";

import { Card, CardBody, Table, Col, Row, Jumbotron } from "reactstrap";
import { formatMoney } from "../../utils/utils";
const Neraca = ({ data }) => {
  console.log(data);
  const {
    aktivaLancar,
    aktivaTetap,
    totalAktiva,
    totalPasiva,
    modal,
    hutang
  } = data;
  return (
    <Card>
      <CardBody>
        <Jumbotron>
          <h4 className="display-3">Neraca</h4>
          <hr className="my-2" />
          <Row>
            <Col>
              <h5>Aktiva</h5>
              <hr className="my-2" />
              <h6>
                <strong>Aktiva Lancar</strong>
              </h6>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Kas</td>
                    <td>{`Rp${formatMoney(aktivaLancar.kas)}`}</td>
                  </tr>
                  <tr>
                    <td>Piutang Dagang</td>
                    <td>{`Rp${formatMoney(aktivaLancar.piutangDagang)}`}</td>
                  </tr>
                  <tr>
                    <td>Perlengkapan</td>
                    <td>{`Rp${formatMoney(aktivaLancar.perlengkapan)}`}</td>
                  </tr>
                  <tr>
                    <td>Sewa dibayar Dimuka</td>
                    <td>
                      {`Rp${formatMoney(aktivaLancar.sewaDibayarDimuka)}`}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <h6>
                <strong>Aktiva Tetap</strong>
              </h6>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Peralatan</td>
                    <td>{`Rp${formatMoney(aktivaTetap.peralatan)}`}</td>
                  </tr>
                  <tr>
                    <td>Akumulasi Penyusutan</td>
                    <td>{`Rp${formatMoney(
                      aktivaTetap.akumulasiPenyusutan
                    )}`}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <h5>Pasiva</h5>
              <hr className="my-2" />
              <h6>
                <strong>Hutang</strong>
              </h6>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Hutang Dagang</td>
                    <td>{`Rp${formatMoney(hutang.hutangDagang)}`}</td>
                  </tr>
                </tbody>
              </Table>
              <h6>
                <strong>Modal</strong>
              </h6>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Modal</td>
                    <td>{`Rp${formatMoney(modal.modal)}`}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <hr className="my-2" />

          <Row>
            <Col style={{ textAlign: "right" }}>
              <h5>{`Rp${formatMoney(totalAktiva)}`}</h5>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <h5>{`Rp${formatMoney(totalPasiva)}`}</h5>
            </Col>
          </Row>
        </Jumbotron>
      </CardBody>
    </Card>
  );
};

export default Neraca;
