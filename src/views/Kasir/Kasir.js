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
    this.state = {
      dataBarang: [],
      kasir: {
        id_pembeli: "",
        kd_barang: "",
        jumlah: "",
        potongan: ""
      }
    };
  }
  handleChangeKasir = event => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      kasir: {
        ...prevState.kasir,
        [name]: value
      }
    }));
    console.log(this.state);
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

  showNamaBarang = () => {
    this.state.dataBarang.find(barang => {
      if (barang.kd_barang === this.state.kasir.kd_barang) {
        console.log(barang.nama_barang);
        return barang.nama_barang;
      }
    });
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
                  <Col xs="12" md="9">
                    <Input
                      onChange={this.handleChangeKasir}
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
                      {this.state.kasir.kd_barang.length === 6
                        ? `${this.showNamaBarang()}`
                        : "nama barang"}
                    </p>
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
                    <p className="form-control-static">12000</p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="potongan">Potongan</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      id="potongan"
                      name="potongan"
                      onChange={this.handleChangeKasir}
                    />
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
