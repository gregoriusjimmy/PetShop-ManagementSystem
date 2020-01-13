import React from "react";
import { Card, CardBody, Table, Col, Row } from "reactstrap";
class TabelPerkiraan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  convertDate = date => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  render() {
    const { perkiraan } = this.props;
    return (
      <div>
        <Card>
          <CardBody>
            <Row>
              <Col md={9}>
                <h2>{perkiraan[0].nama_akun}</h2>
              </Col>
              <Col>
                <h2>No Akun: {perkiraan[0].no_akun}</h2>
              </Col>
            </Row>
            <Table hover>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Uraian</th>
                  <th>Ref</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                </tr>
              </thead>
              <tbody>
                {perkiraan.map(field => {
                  return (
                    <tr key={field.no_transaksi}>
                      <td>{this.convertDate(field.tgl_transaksi)}</td>
                      <td>{field.keterangan}</td>
                      <td>{field.no_akun}</td>
                      <td>{field.debit}</td>
                      <td>{field.kredit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default TabelPerkiraan;
