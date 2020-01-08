import React, { Component } from "react";
import {
  Table,
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

import "./beli.styles.scss";
import InputHutang from "./input-hutang";

import { utilsOnRead, utilsOnAdd } from "../../utils/crud.utils";
import { formatMoneyOnChange, formatMoney } from "../../utils/utils";

const INITIAL_STATE = {
  dataBarang: [],
  dataSupplier: [],
  cariBarang: "",
  cariSupplier: "",
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
      dataSupplier: [],
      cariBarang: "",
      cariSupplier: "",
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
    this.readData();
  };

  refresh = status => {
    if (status === 200) {
      this.setState(INITIAL_STATE);
      this.readData();
    }
  };
  readData = async () => {
    const dataBarang = await utilsOnRead("http://localhost:3001/item");
    const dataSupplier = await utilsOnRead("http://localhost:3001/supplier");
    console.log(dataSupplier);
    if (dataBarang && dataSupplier) {
      this.setState({ dataBarang: dataBarang, dataSupplier: dataSupplier });
    } else {
      return alert("Failed to fetch data barang");
    }
  };

  onConfirmBeli = async () => {
    const {
      harga_total,
      metode,
      id_supplier,
      kd_barang,
      jumlah,
      nama_barang,
      dpBeliValue
    } = this.state.beliBarang;

    if (!harga_total || !metode) {
      return alert("tekan tombol read terlebih dahulu");
    }

    const generateKodeTransaksi = `SELL_${Math.floor(
      1000 + Math.random() * 8999
    )}`;

    const dataSend = {
      id_supplier: id_supplier,
      kd_barang: kd_barang,
      jumlah: jumlah,
      harga_total: harga_total
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
      keterangan: `Membeli ${nama_barang} sebanyak ${jumlah}`
    };

    const dataSendJurnalHutang = {
      kd_transaksi: generateKodeTransaksi,
      tgl_transaksi: new Date(),
      no_akun: 21,
      nama_akun: "HUTANG DAGANG",
      keterangan: `Hutang kepada ${id_supplier}`
    };

    if (metode === "tunai") {
      dataSendJurnalKas.kredit = harga_total;
      dataSendJurnalPerlengkapan.debit = harga_total;
    } else {
      const hargaTotal = harga_total.replace(/[Rp.]+/g, "");

      if (!dpBeliValue) {
        return alert("dp tidak boleh kosong ");
      }
      const hutang = hargaTotal - dpBeliValue.replace(/[Rp.]+/g, "");
      if (hutang <= 0) {
        return alert("dp melebihi harga total");
      }
      dataSendJurnalHutang.kredit = hutang;
      dataSendJurnalKas.kredit = dpBeliValue;
      dataSendJurnalPerlengkapan.debit = harga_total;
    }

    const status = await utilsOnAdd(
      "http://localhost:3001/transaksi_beli",
      dataSend
    );

    if (status === 200) {
      utilsOnAdd("http://localhost:3001/jurnal", dataSendJurnalKas);
      utilsOnAdd("http://localhost:3001/jurnal", dataSendJurnalPerlengkapan);

      if (metode === "hutang") {
        utilsOnAdd("http://localhost:3001/jurnal", dataSendJurnalHutang);
      }

      alert("Transaksi berhasil");
      this.refresh(status);
    } else {
      return alert("Transaksi gagal");
    }
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
        harga_total: `Rp${formatMoney(hargaTotal)}`,
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
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  handleChangeMoney = event => {
    const { value, name } = event.target;
    const formatedMoney = formatMoneyOnChange(value);
    this.setState(prevState => ({
      beliBarang: {
        ...prevState.beliBarang,
        [name]: formatedMoney
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
  filterBarang = () => {
    const { dataBarang, cariBarang } = this.state;
    return dataBarang.filter(field => {
      return field.nama_barang.toUpperCase().includes(cariBarang.toUpperCase());
    });
  };
  filterSupplier = () => {
    const { dataSupplier, cariSupplier } = this.state;
    return dataSupplier.filter(field => {
      return field.nama_supplier
        .toUpperCase()
        .includes(cariSupplier.toUpperCase());
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
                    handleChange={this.handleChangeMoney}
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
        <Col md="6">
          <Card>
            <CardHeader>
              <strong>Data Barang</strong>
            </CardHeader>
            <CardBody>
              <Input
                value={this.state.cariBarang}
                id="cariBarang"
                name="cariBarang"
                placeholder="cari barang.."
                onChange={this.handleChange}
              />
              <div className="my-custom-scrollbar">
                <Table responsive>
                  <tbody>
                    {this.state.dataBarang
                      ? this.filterBarang().map(dataField => {
                          return (
                            <tr key={dataField.kd_barang}>
                              <td>{dataField.nama_barang}</td>
                              <td>{dataField.kd_barang}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
          {/* SUPPLIER */}
          <Card>
            <CardHeader>
              <strong>Data Supplier</strong>
            </CardHeader>
            <CardBody>
              <Input
                value={this.state.cariSupplier}
                id="cariSupplier"
                name="cariSupplier"
                placeholder="cari supplier.."
                onChange={this.handleChange}
              />
              <div className="my-custom-scrollbar">
                <Table responsive>
                  <tbody>
                    {this.state.dataSupplier
                      ? this.filterSupplier().map(dataField => {
                          return (
                            <tr key={dataField.id_supplier}>
                              <td>{dataField.nama_supplier}</td>
                              <td>{dataField.id_supplier}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Pesan;
