import React from "react";
import {
  Card,
  CardBody,
  Table,
  Col,
  Row,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Kasir extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col md="6">
          <Card>
            <CardHeader>
              <strong>Kasir</strong>
            </CardHeader>
            <CardBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="kd_transaksi">Kode Transaksi</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input id="kd_transaksi" name="kd_transaksi" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="nama">Id Pembeli</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input id="nama" name="nama" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="kd_barang">Kode Barang</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input id="kd_barang" name="kd_barang" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="nama_barang">Barang</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">nama barang</p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="jumlah">Jumlah</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input id="jumlah" name="jumlah" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="harga_jual">Harga</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">12000</p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="diskon">Diskon</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input id="diskon" name="diskon" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="total">Total</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">12000</p>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Kasir;
