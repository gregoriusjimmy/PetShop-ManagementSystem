import React, { Component } from "react";
import DATA_AKUN from "./data_akun";
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
  CardHeader
} from "reactstrap";

const initialState = {
  tabelItem: [],
  data_akun: DATA_AKUN,
  kd_transaksi: "",
  tgl_transaksi: "",
  no_akun: "",
  nama_akun: "",
  keterangan: "",
  debit: "",
  kredit: "",
  jenis_transaksi: "",
  jumlah_uang: "",
  startDate: "",
  endDate: ""
};
class Jurnal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      data_akun: DATA_AKUN,
      kd_transaksi: "",
      tgl_transaksi: "",
      no_akun: "",
      nama_akun: "",
      keterangan: "",
      debit: "",
      kredit: "",
      jenis_transaksi: "",
      jumlah_uang: "",
      startDate: "",
      endDate: ""
    };
  }

  readData = () => {
    fetch("http://localhost:3001/jurnal")
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to fetch");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ tabelItem: data }, () => {
          this.state.tabelItem.forEach(dataField => {
            const newDate = new Date(dataField.tgl_transaksi);
            const convertToTime = newDate.getTime();
            Object.assign(dataField, { newDateInTime: convertToTime });
          });
        });
      });
  };
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  handleChangeNamaAkun = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value }, () => {
      this.setState({
        no_akun: Object.keys(this.state.data_akun).find(
          key => this.state.data_akun[key] === this.state.nama_akun
        )
      });
    });
  };
  onAdd = async () => {
    if (this.state.jenis_transaksi === "DEBIT") {
      await this.setState({ debit: this.state.jumlah_uang });
    } else if (this.state.jenis_transaksi === "KREDIT") {
      await this.setState({ kredit: this.state.jumlah_uang });
    } else {
      return alert("Pilih jenis transaksi");
    }

    if (
      !this.state.nama_akun ||
      !this.state.tgl_transaksi ||
      !this.state.jumlah_uang ||
      !this.state.kd_transaksi ||
      !this.state.no_akun
    ) {
      return alert("harap isi semua field");
    }
    fetch("http://localhost:3001/jurnal", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_transaksi: this.state.kd_transaksi,
        tgl_transaksi: this.state.tgl_transaksi,
        no_akun: this.state.no_akun,
        nama_akun: this.state.nama_akun,
        keterangan: this.state.keterangan,
        debit: this.state.debit,
        kredit: this.state.kredit
      })
    })
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to add");
        }
        return response.json();
      })
      .then(data => {
        this.setState(initialState);
        this.readData();
      });
  };

  componentDidMount() {
    this.readData();
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

  filterField = () => {
    const { tabelItem, startDate, endDate } = this.state;
    let startDateInTime = "";
    let endDateInTime = "";
    if (startDate) {
      let convertStartDate = new Date(startDate);
      startDateInTime = convertStartDate.getTime();
    }
    if (endDate) {
      let convertEndDate = new Date(endDate);
      endDateInTime = convertEndDate.getTime();
    }
    return tabelItem.filter(field => {
      if (startDate && endDate) {
        return (
          field.newDateInTime > startDateInTime &&
          field.newDateInTime < endDateInTime
        );
      }
      return true;
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="tgl_transaksi">Tanggal transaksi</Label>
                    <Input
                      type="date"
                      value={this.state.tgl_transaksi}
                      name="tgl_transaksi"
                      id="tgl_transaksi"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nama_akun">Nama Akun</Label>
                    <Input
                      type="select"
                      name="nama_akun"
                      id="nama_akun"
                      onChange={this.handleChangeNamaAkun}
                    >
                      <option value="0">Please select</option>
                      <option value="KAS">KAS</option>
                      <option value="PIUTANG">PIUTANG</option>
                      <option value="PERLENGKAPAN">PERLENGKAPAN</option>
                      <option value="SEWA DIBAYAR DIMUKA">
                        SEWA DIBAYAR DIMUKA
                      </option>
                      <option value="PERALATAN">PERALATAN</option>
                      <option value="AKUMULASI PENYUSUTAN">
                        AKUMULASI PENYUSUTAN
                      </option>
                      <option value="HUTANG DAGANG">HUTANG DAGANG</option>
                      <option value="MODAL">MODAL</option>
                      <option value="PRIVE">PRIVE</option>
                      <option value="PENDAPATAN">PENDAPATAN</option>
                      <option value="BEBAN PERLENGKAPAN">
                        BEBAN PERLENGKAPAN
                      </option>
                      <option value="BEBAN GAJI">BEBAN GAJI</option>
                      <option value="BEBAN SEWA">BEBAN SEWA</option>
                      <option value="BEBAN LISTRIK">BEBAN LISTRIK</option>
                      <option value="BEBAN TELEPON">BEBAN TELEPON</option>
                      <option value="BEBAN AIR">BEBAN AIR</option>
                      <option value="BEBAN PENYUSUTAN">BEBAN PENYUSUTAN</option>
                      <option value="BEBAN RUPA-RUPA">BEBAN RUPA-RUPA</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="no_akun">No. Akun</Label>
                    <h4 className="form-control-static">
                      {this.state.no_akun}
                    </h4>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={2}>
                  <FormGroup>
                    <Label for="kd_transaksi">Kode Transaksi</Label>
                    <Input
                      value={this.state.kd_transaksi}
                      name="kd_transaksi"
                      id="kd_transaksi"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="jenis_transaksi">Jenis Transaksi</Label>
                    <Input
                      value={this.state.jenis_transaksi}
                      type="select"
                      name="jenis_transaksi"
                      id="jenis_transaksi"
                      onChange={this.handleChange}
                    >
                      <option value="0">Pilih</option>
                      <option value="DEBIT">DEBIT</option>
                      <option value="KREDIT">KREDIT</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="keterangan">Keterangan</Label>
                    <Input
                      value={this.state.keterangan}
                      name="keterangan"
                      id="keterangan"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="jumlah_uang">Jumlah</Label>
                    <Input
                      value={this.state.jumlah_uang}
                      name="jumlah_uang"
                      id="jumlah_uang"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <Button color="success" onClick={this.onAdd}>
              Submit
            </Button>
          </CardBody>
        </Card>
        <Row>
          <Col md={7}>
            <Card>
              <CardHeader>Filter tanggal</CardHeader>
              <CardBody>
                <Row>
                  <Col md={5}>
                    <Input
                      name="startDate"
                      type="date"
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <Label>sampai</Label>
                  </Col>
                  <Col md={5}>
                    <Input
                      name="endDate"
                      type="date"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>KODE_TRANSAKSI</th>
                  <th>TGL_TRANSAKSI</th>
                  <th>NO_AKUN</th>
                  <th>NAMA_AKUN</th>
                  <th>KETERANGAN</th>
                  <th>DEBIT</th>
                  <th>KREDIT</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem
                  ? this.filterField().map(dataField => {
                      return (
                        <tr key={dataField.no_transaksi}>
                          <td>{dataField.kd_transaksi}</td>
                          <td>{this.convertDate(dataField.tgl_transaksi)}</td>
                          <td>{dataField.no_akun}</td>
                          <td>{dataField.nama_akun}</td>
                          <td>{dataField.keterangan}</td>
                          <td>{dataField.debit}</td>
                          <td>{dataField.kredit}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Jurnal;