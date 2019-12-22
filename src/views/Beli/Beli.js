import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { utilsOnRead, utilsOnAdd } from "../../utils/crud.utils";

const INITIAL_STATE = {
  dataBarang: [],
  beliBarang: {
    id_supplier: "",
    kd_barang: "",
    jumlah: "",
    harga_total: "",
    nama_barang: ""
  }
};

class Pesan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBarang: [],
      beliBarang: {
        id_supplier: "",
        kd_barang: "",
        jumlah: "",
        harga_total: "",
        nama_barang: ""
      }
    };
  }

  componentDidMount = () => {
    this.readDataBarang();
  };

  refresh = status => {
    if (status === 200) {
      this.setState(INITIAL_STATE);
      this.readDataBarang();
    }
  };
  readDataBarang = async () => {
    const data = await utilsOnRead("http://localhost:3001/item");
    if (data) {
      this.setState({ dataBarang: data });
    } else {
      return alert("Failed to fetch data barang");
    }
  };

  onConfirmBeli = async () => {
    if (!this.state.beliBarang.harga_total) {
      return alert("tekan tombol read terlebih dahulu");
    }
    const dataSend = {
      id_supplier: this.state.beliBarang.id_supplier,
      kd_barang: this.state.beliBarang.kd_barang,
      jumlah: this.state.beliBarang.jumlah,
      harga_total: this.state.beliBarang.harga_total
    };
    const status = await utilsOnAdd(
      "http://localhost:3001/transaksi_beli",
      dataSend
    );
    if (status === 200) {
      alert("Transaksi berhasil");
    } else {
      return alert("Transaksi gagal");
    }
    this.refresh(status);
  };

  onReadBeli = () => {
    const { jumlah, id_supplier } = this.state.beliBarang;
    const barang = this.searchBarang();
    if (!barang) {
      return alert("Barang tidak ditemukan");
    }
    if (!jumlah || !id_supplier) {
      return alert("Harap mengisi semua input");
    }
    const hargaTotal = barang.harga_jual.replace(/[^0-9.-]+/g, "") * jumlah;

    // const potongan = (diskon / 100) * hargaTotal;

    // const hargaBersih = hargaTotal - potongan;

    this.setState(prevState => ({
      beliBarang: {
        ...prevState.beliBarang,
        harga_total: `Rp${hargaTotal}.000`,
        nama_barang: barang.nama_barang
      }
    }));
  };

  handleChangeBeli = event => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      beliBarang: {
        ...prevState.beliBarang,
        [name]: value
      }
    }));
  };

  searchBarang = () => {
    return this.state.dataBarang.find(barang => {
      return (
        barang.kd_barang.toUpperCase() ===
        this.state.beliBarang.kd_barang.toUpperCase()
      );
    });
  };

  render() {
    return (
      <Row>
        <Col md="6">
          <Card>
            <CardHeader>
              <strong>Beli Barang</strong>
            </CardHeader>
            <CardBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="id_supplier">Id Supplier</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      value={this.state.beliBarang.id_supplier}
                      id="id_supplier"
                      name="id_supplier"
                      onChange={this.handleChangeBeli}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="kd_barang">Kode Barang</Label>
                  </Col>
                  <Col xs="9" md="9">
                    <Input
                      value={this.state.beliBarang.kd_barang}
                      onChange={this.handleChangeBeli}
                      id="kd_barang"
                      name="kd_barang"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="nama_barang">Barang</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">
                      {this.state.beliBarang.nama_barang}
                    </p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="jumlah">Jumlah</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      value={this.state.beliBarang.jumlah}
                      id="jumlah"
                      name="jumlah"
                      onChange={this.handleChangeBeli}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="harga_beli">Harga Total</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">
                      {this.state.beliBarang.harga_total}
                    </p>
                  </Col>
                </FormGroup>
                <FormGroup style={{ float: "right" }}>
                  <Button color="primary" onClick={this.onReadBeli}>
                    Read
                  </Button>{" "}
                  <Button color="success" onClick={this.onConfirmBeli}>
                    Confirm
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Pesan;
