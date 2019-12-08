import React, { Suspense } from "react";
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
  handleChangeKasir = event => {
    const { value, name } = event.target;

    this.setState(
      prevState => ({
        kasir: {
          ...prevState.kasir,
          [name]: value
        }
      }),
      () => {
        console.log(this.state);
      }
    );
  };
  componentDidMount = () => {
    this.readDataBarang();
  };
  readDataBarang = () => {
    fetch("http://localhost:3001/item")
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to fetch data barang");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ dataBarang: data });
      });
  };

  searchBarang = () => {
    return this.state.dataBarang.find(barang => {
      return (
        barang.kd_barang.toUpperCase() ===
        this.state.kasir.kd_barang.toUpperCase()
      );
    });
  };

  onReadKasir = () => {
    const { jumlah, diskon } = this.state.kasir;
    const barang = this.searchBarang();
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
  // onSearchBarang = event => {
  //   event.persist();
  //   this.setState(prevState => ({
  //     kasir: {
  //       ...prevState.kasir,
  //       kd_barang: event.target.value
  //     }
  //   }));
  // };

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
                  <Col xs="9" md="6">
                    <Input
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
                    <Suspense>
                      <p className="form-control-static">
                        {this.state.kasir.nama_barang}
                      </p>
                    </Suspense>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="jumlah">Jumlah</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
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
                  <Col xs="12" md="9">
                    <Input
                      id="diskon"
                      name="diskon"
                      onChange={this.handleChangeKasir}
                    />
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
                <Button
                  style={{ float: "right" }}
                  color="success"
                  onClick={this.onReadKasir}
                >
                  Read
                </Button>
                <Button
                  style={{ float: "right" }}
                  color="success"
                  onClick={this.onConfirm}
                >
                  Confirm
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Kasir;
