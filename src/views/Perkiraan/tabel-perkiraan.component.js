import React from "react";
import { Card, CardBody, Table, Col, Row } from "reactstrap";
import { formatMoney } from "../../utils/utils";
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

  calculateSaldo = perkiraan => {
    //perkiraan is an array
    let debit = [];
    let kredit = [];
    perkiraan.forEach(element => {
      if (element.debit) {
        debit.push(parseInt(element.debit.replace(/[Rp.]+/g, "")));
      } else {
        kredit.push(parseInt(element.kredit.replace(/[Rp.]+/g, "")));
      }
    });
    const totalDebit = debit.reduce((a, b) => a + b, 0);
    const totalKredit = kredit.reduce((a, b) => a + b, 0);

    const saldo = totalDebit - totalKredit;

    if (saldo < 0) {
      const formatedSaldo = formatMoney(Math.abs(saldo));
      return { jenis: "KREDIT", saldo: formatedSaldo };
    } else {
      const formatedSaldo = formatMoney(saldo);
      return {
        jenis: "DEBIT",
        saldo: formatedSaldo
      };
    }
  };

  render() {
    const { perkiraan } = this.props;
    const saldoObj = this.calculateSaldo(perkiraan);
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
            <Row>
              <Col md={6}></Col>
              <Col>
                <h5>{`Saldo ${saldoObj.jenis}:  `}</h5>
              </Col>
              <Col>
                <h5>{`Rp${saldoObj.saldo}`}</h5>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default TabelPerkiraan;
