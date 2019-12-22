import React from "react";
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
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import { utilsOnRead, utilsOnAdd } from "../../utils/crud.utils";

const INITIAL_STATE = {
  dataBarang: [],
  kasir: {
    id_pembeli: "",
    kd_barang: "",
    jumlah: "",
    harga_normal: "",
    potongan: "",
    harga_total: "",
    diskon: "",
    nama_barang: ""
  }
};
class Kasir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBarang: [],
      kasir: {
        id_pembeli: "",
        kd_barang: "",
        jumlah: "",
        harga_normal: "",
        potongan: "",
        harga_total: "",
        diskon: "",
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

  onConfirmKasir = async () => {
    if (!this.state.kasir.harga_total) {
      return alert("tekan tombol read terlebih dahulu");
    }
    const dataSend = {
      id_pembeli: this.state.kasir.id_pembeli,
      kd_barang: this.state.kasir.kd_barang,
      jumlah: this.state.kasir.jumlah,
      harga_normal: this.state.kasir.harga_normal,
      potongan: this.state.kasir.potongan,
      harga_total: this.state.kasir.harga_total
    };
    const status = await utilsOnAdd(
      "http://localhost:3001/transaksi_jual",
      dataSend
    );
    if (status === 200) {
      alert("Transaksi berhasil");
    } else {
      return alert("Transaksi gagal");
    }
    this.refresh(status);
  };

  onReadKasir = () => {
    const { jumlah, diskon, id_pembeli } = this.state.kasir;
    const barang = this.searchBarang();
    if (!barang) {
      return alert("Barang tidak ditemukan");
    }
    if (!diskon || !jumlah || !id_pembeli) {
      return alert("Harap mengisi semua input");
    }
    const hargaTotal = barang.harga_jual.replace(/[^0-9.-]+/g, "") * jumlah;

    const potongan = (diskon / 100) * hargaTotal;

    const hargaBersih = hargaTotal - potongan;

    this.setState(prevState => ({
      kasir: {
        ...prevState.kasir,
        harga_normal: `Rp${hargaTotal}.000`,
        potongan: `Rp${potongan}.000`,
        harga_total: `Rp${hargaBersih}.000`,
        nama_barang: barang.nama_barang
      }
    }));
  };

  handleChangeKasir = event => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      kasir: {
        ...prevState.kasir,
        [name]: value
      }
    }));
  };

  searchBarang = () => {
    return this.state.dataBarang.find(barang => {
      return (
        barang.kd_barang.toUpperCase() ===
        this.state.kasir.kd_barang.toUpperCase()
      );
    });
  };

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
                    <Label htmlFor="id_pembeli">Id Pembeli</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      value={this.state.kasir.id_pembeli}
                      id="id_pembeli"
                      name="id_pembeli"
                      onChange={this.handleChangeKasir}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="kd_barang">Kode Barang</Label>
                  </Col>
                  <Col xs="9" md="9">
                    <Input
                      value={this.state.kasir.kd_barang}
                      onChange={this.handleChangeKasir}
                      id="kd_barang"
                      name="kd_barang"
                    />
                  </Col>
                  {/* <Col xs="3" md="3">
                    <Button color="primary" onClick={this.searchNamaBarang}>
                      <i className="fa fa-search"></i>
                    </Button>
                  </Col> */}
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="nama_barang">Barang</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">
                      {this.state.kasir.nama_barang}
                    </p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="jumlah">Jumlah</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      value={this.state.kasir.jumlah}
                      id="jumlah"
                      name="jumlah"
                      onChange={this.handleChangeKasir}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="harga_jual">Harga</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">
                      {this.state.kasir.harga_normal}
                    </p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="diskon">Diskon</Label>
                  </Col>
                  <Col xs="12" md="5">
                    <InputGroup>
                      <Input
                        value={this.state.kasir.diskon}
                        id="diskon"
                        name="diskon"
                        onChange={this.handleChangeKasir}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fa fa-percent"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="potongan">Potongan</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {/* <Input
                      id="potongan"
                      name="potongan"
                      onChange={this.handleChangeKasir}
                    /> */}
                    <p className="form-control-static">
                      {this.state.kasir.potongan}
                    </p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="total">Total</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">
                      {this.state.kasir.harga_total}
                    </p>
                  </Col>
                </FormGroup>
                <FormGroup style={{ float: "right" }}>
                  <Button color="primary" onClick={this.onReadKasir}>
                    Read
                  </Button>{" "}
                  <Button color="success" onClick={this.onConfirmKasir}>
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

export default Kasir;
