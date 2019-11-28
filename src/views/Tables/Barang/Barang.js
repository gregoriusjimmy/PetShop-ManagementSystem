import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
const initialState = {
  tabelItem: [],
  kd_barang: "",
  nama_barang: "",
  satuan: "",
  harga: "",
  stok_barang: ""
};
class Barang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      kd_barang: "",
      nama_barang: "",
      satuan: "",
      harga: "",
      stok_barang: ""
    };
  }
  readData = () => {
    fetch("http://localhost:3001/item")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ tabelItem: data });
      });
  };
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  handleUpdate = event => {
    const dataId = event.target.attributes.data_id.value;
    const found = this.state.tabelItem.find(dataField => {
      return dataField.kd_barang === dataId;
    });
    this.setState({
      kd_barang: found.kd_barang,
      nama_barang: found.nama_barang,
      satuan: found.satuan,
      harga: found.harga,
      stok_barang: found.stok_barang
    });
  };
  onAdd = () => {
    fetch("http://localhost:3001/item", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_barang: this.state.kd_barang,
        nama_barang: this.state.nama_barang,
        satuan: this.state.satuan,
        harga: this.state.harga,
        stok_barang: this.state.stok_barang
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState(initialState);
        this.readData();
      });
  };
  onUpdate = () => {
    fetch("http://localhost:3001/item", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_barang: this.state.kd_barang,
        nama_barang: this.state.nama_barang,
        satuan: this.state.satuan,
        harga: this.state.harga,
        stok_barang: this.state.stok_barang
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState(initialState);
        this.readData();
      });
  };
  componentDidMount() {
    this.readData();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="kd_barang">Kode Barang</Label>
                    <Input
                      value={this.state.kd_barang}
                      name="kd_barang"
                      id="kd_barang"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nama_barang">Nama Barang</Label>
                    <Input
                      value={this.state.nama_barang}
                      name="nama_barang"
                      id="nama_barang"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="satuan">Satuan</Label>
                    <Input
                      value={this.state.satuan}
                      name="satuan"
                      id="satuan"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="harga">Harga</Label>
                    <Input
                      value={this.state.harga}
                      name="harga"
                      id="harga"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="stok_barang">Stok Barang</Label>
                    <Input
                      value={this.state.stok_barang}
                      name="stok_barang"
                      id="stok_barang"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <Button color="success" onClick={this.onAdd}>
              Add
            </Button>{" "}
            <Button color="warning" onClick={this.onUpdate}>
              Update
            </Button>{" "}
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>KD_BRNG</th>
                  <th>NAMA_BRNG</th>
                  <th>SATUAN</th>
                  <th>HARGA</th>
                  <th>STOK_BRNG</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem.map(dataField => {
                  return (
                    <tr key={dataField.kd_barang}>
                      <td>{dataField.kd_barang}</td>
                      <td>{dataField.nama_barang}</td>
                      <td>{dataField.satuan}</td>
                      <td>{dataField.harga}</td>
                      <td>{dataField.stok_barang}</td>
                      <td>
                        <button
                          className="fa fa-edit mr-2"
                          onClick={this.handleUpdate}
                          data_id={dataField.kd_barang}
                        />
                        <button className="fa fa-trash" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Barang;
