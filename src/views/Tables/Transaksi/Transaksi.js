import React, { Component } from "react";
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
  Input
} from "reactstrap";
const initialState = {
  tabelItem: [],
  kd_transaksi: "",
  id_pembeli: "",
  kd_barang: "",
  jumlah: "",
  tgl_transaksi: ""
};

class Transaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      kd_transaksi: "",
      id_pembeli: "",
      kd_barang: "",
      jumlah: "",
      tgl_transaksi: ""
    };
  }
  readData = () => {
    fetch("http://localhost:3001/transaksi")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ tabelItem: data });
      });
  };
  componentDidMount() {
    this.readData();
  }
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  handleUpdate = event => {
    const dataId = event.target.attributes.data_id.value;
    const found = this.state.tabelItem.find(dataField => {
      return dataField.kd_transaksi === dataId;
    });
    this.setState({
      kd_transaksi: found.kd_transaksi,
      id_pembeli: found.id_pembeli,
      kd_barang: found.kd_barang,
      jumlah: found.jumlah,
      tgl_transaksi: found.tgl_transaksi
    });
  };
  onDelete = event => {
    fetch("http://localhost:3001/transaksi", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_transaksi: event.target.attributes.data_id.value
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.readData();
      });
  };
  onAdd = () => {
    fetch("http://localhost:3001/transaksi", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_transaksi: this.state.kd_transaksi,
        id_pembeli: this.state.id_pembeli,
        kd_barang: this.state.kd_barang,
        jumlah: this.state.jumlah,
        tgl_transaksi: this.state.tgl_transaksi
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
    fetch("http://localhost:3001/transaksi", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_transaksi: this.state.kd_transaksi,
        id_pembeli: this.state.id_pembeli,
        kd_barang: this.state.kd_barang,
        jumlah: this.state.jumlah,
        tgl_transaksi: this.state.tgl_transaksi
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
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
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
                <Col md={6}>
                  <FormGroup>
                    <Label for="id_pembeli">Id Pembeli</Label>
                    <Input
                      value={this.state.id_pembeli}
                      name="id_pembeli"
                      id="id_pembeli"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
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
                <Col md={4}>
                  <FormGroup>
                    <Label for="jumlah">Jumlah</Label>
                    <Input
                      value={this.state.jumlah}
                      name="jumlah"
                      id="jumlah"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="tgl_transaksi">Tanggal Transaksi</Label>
                    <Input
                      type="date"
                      value={this.state.tgl_transaksi}
                      name="tgl_transaksi"
                      id="tgl_transaksi"
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
                  <th>KD_TRANSAKSI</th>
                  <th>ID_PEMBELI</th>
                  <th>KD_BARANG</th>
                  <th>JUMLAH</th>
                  <th>TGL_TRANSAKSI</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem.map(dataField => {
                  return (
                    <tr key={dataField.kd_transaksi}>
                      <td>{dataField.kd_transaksi}</td>
                      <td>{dataField.id_pembeli}</td>
                      <td>{dataField.kd_barang}</td>
                      <td>{dataField.jumlah}</td>
                      <td>{dataField.tgl_transaksi.slice(0, 10)}</td>
                      <td>
                        <button
                          className="fa fa-edit mr-2"
                          onClick={this.handleUpdate}
                          data_id={dataField.kd_transaksi}
                        />
                        <button
                          className="fa fa-trash"
                          onClick={this.onDelete}
                          data_id={dataField.kd_transaksi}
                        />
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

export default Transaksi;
