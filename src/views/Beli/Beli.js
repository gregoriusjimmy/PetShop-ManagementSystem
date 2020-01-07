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

import InputHutang from "./input-hutang";

import { utilsOnRead, utilsOnAdd } from "../../utils/crud.utils";

const INITIAL_STATE = {
  dataBarang: [],
  beliBarang: {
    id_supplier: "",
    kd_barang: "",
    jumlah: "",
    harga_total: "",
    nama_barang: "",
    metode: "",
    dpBeliValue: ""
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
        nama_barang: "",
        jenisTransaksi: "",
        metode: "",
        dpBeliValue: ""
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
    if (!this.state.beliBarang.harga_total || !this.state.beliBarang.metode) {
      return alert("tekan tombol read terlebih dahulu");
    }
    const generateKodeTransaksi = `SELL_${Math.floor(
      1000 + Math.random() * 8999
    )}`;
    const dataSend = {
      id_supplier: this.state.beliBarang.id_supplier,
      kd_barang: this.state.beliBarang.kd_barang,
      jumlah: this.state.beliBarang.jumlah,
      harga_total: this.state.beliBarang.harga_total
    };

    const dataSendJurnalKas = {
      kd_transaksi: generateKodeTransaksi,
      tgl_transaksi: new Date(),
      no_akun: 11,
      nama_akun: "KAS",
      keterangan: "Kas pada perlengkapan"
    };
    const dataSendJurnalPerlengkapan = {
      kd_transaksi: generateKodeTransaksi,
      tgl_transaksi: new Date(),
      no_akun: 13,
      nama_akun: "PERLENGKAPAN",
      keterangan: `Membeli ${this.state.beliBarang.nama_barang} sebanyak ${this.state.beliBarang.jumlah}`
    };
    const dataSendJurnalHutang = {
      kd_transaksi: generateKodeTransaksi,
      tgl_transaksi: new Date(),
      no_akun: 21,
      nama_akun: "HUTANG DAGANG",
      keterangan: `Hutang kepada ${this.state.beliBarang.id_supplier}`
    };
    if (this.state.beliBarang.metode === "tunai") {
      dataSendJurnalKas.kredit = this.state.beliBarang.harga_total;
      dataSendJurnalPerlengkapan.debit = this.state.beliBarang.harga_total;
    } else {
      const hargaTotal = this.state.beliBarang.harga_total.replace(
        /[Rp.]+/g,
        ""
      );

      if (!this.state.beliBarang.dpBeliValue) {
        return alert("dp tidak boleh kosong ");
      }
      const hutang = hargaTotal - this.state.beliBarang.dpBeliValue;
      if (hutang <= 0) {
        return alert("dp melebihi harga total");
      }
      dataSendJurnalHutang.kredit = hutang;
      dataSendJurnalKas.kredit = this.state.beliBarang.dpBeliValue;
      dataSendJurnalPerlengkapan.debit = this.state.beliBarang.harga_total;
    }

    const status = await utilsOnAdd(
      "http://localhost:3001/transaksi_beli",
      dataSend
    );
    if (status === 200) {
      utilsOnAdd("http://localhost:3001/jurnal", dataSendJurnalKas);
      utilsOnAdd("http://localhost:3001/jurnal", dataSendJurnalPerlengkapan);
      if (this.state.beliBarang.metode === "hutang") {
        utilsOnAdd("http://localhost:3001/jurnal", dataSendJurnalHutang);
      }
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
    const hargaTotal = barang.harga_jual.replace(/[Rp.]+/g, "") * jumlah;

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
                <FormGroup row>
                  <Col md="3">
                    <Label>Metode</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        onChange={this.handleChangeBeli}
                        type="radio"
                        id="inline-radio1"
                        name="metode"
                        value="tunai"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-radio1"
                      >
                        Tunai
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        onChange={this.handleChangeBeli}
                        type="radio"
                        id="inline-radio2"
                        name="metode"
                        value="hutang"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-radio2"
                      >
                        Hutang
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                {this.state.beliBarang.metode === "hutang" ? (
                  <InputHutang
                    handleChange={this.handleChangeBeli}
                    dpBeliValue={this.state.beliBarang.dpBeliValue}
                  />
                ) : null}
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
