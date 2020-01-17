import React from "react";
import {
  Card,
  CardBody,
  Table,
  Col,
  Row,
  // Form,
  // FormGroup,
  Jumbotron
} from "reactstrap";
import { formatMoney } from "../../utils/utils";

const LaporanRugiLaba = ({ data }) => {
  const { pendapatan, beban, totalBeban, laba } = data;
  return (
    <Card>
      <CardBody>
        <Jumbotron>
          <h4 className="display-3">Laporan Rugi Laba</h4>
          <hr className="my-2" />
          <Row>
            <Col>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Pendapatan</td>
                    <td>{`Rp${formatMoney(pendapatan)}`}</td>
                  </tr>
                </tbody>
              </Table>

              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Beban Perlengkapan</td>
                    <td>{`Rp${formatMoney(beban.bebanPerlengkapan)}`}</td>
                  </tr>
                  <tr>
                    <td>Beban Gaji</td>
                    <td>{`Rp${formatMoney(beban.bebanGaji)}`}</td>
                  </tr>
                  <tr>
                    <td>Beban Listrik</td>
                    <td>{`Rp${formatMoney(beban.bebanListrik)}`}</td>
                  </tr>
                  <tr>
                    <td>Beban Telepon</td>
                    <td>{`Rp${formatMoney(beban.bebanTelepon)}`}</td>
                  </tr>
                  <tr>
                    <td>Beban Penyusutan</td>
                    <td>{`Rp${formatMoney(beban.bebanPenyusutan)}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Beban</strong>
                    </td>
                    <td>{`Rp${formatMoney(totalBeban)}`}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <hr className="my-2" />

          <Row>
            <Col>
              <h5>Laba</h5>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <h5>{`Rp${formatMoney(laba)}`}</h5>
            </Col>
          </Row>
        </Jumbotron>
      </CardBody>
    </Card>
  );
};
export default LaporanRugiLaba;
