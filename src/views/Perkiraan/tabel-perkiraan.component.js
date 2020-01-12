import React from "react";
import {
  Card,
  CardBody,
  Table,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
const TabelPerkiraan = ({ perkiraan }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <h2>{perkiraan[0].nama_akun}</h2>
          <h2>{perkiraan[0].no_akun}</h2>
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
                    <td>{field.tgl_transaksi}</td>
                    <td>{field.keterangan}</td>
                    <td>{field.ref}</td>
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
};

export default TabelPerkiraan;
