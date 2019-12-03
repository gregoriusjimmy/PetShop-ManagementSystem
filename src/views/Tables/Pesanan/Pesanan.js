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
  kd_order: "",
  tgl_order: "",
  id_supplier: "",
  kd_barang: "",
  jumlah: ""
};

class Pesanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      kd_order: "",
      tgl_order: "",
      id_supplier: "",
      kd_barang: "",
      jumlah: ""
    };
  }
  readData = () => {
    fetch("http://localhost:3001/pesanan")
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
      return dataField.kd_order === dataId;
    });
    this.setState({
      kd_order: found.kd_order,
      tgl_order: found.tgl_order,
      id_supplier: found.id_supplier,
      kd_barang: found.kd_barang,
      jumlah: found.jumlah
    });
  };
  onDelete = event => {
    fetch("http://localhost:3001/pesanan", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_order: event.target.attributes.data_id.value
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
    fetch("http://localhost:3001/pesanan", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_order: this.state.kd_order,
        tgl_order: this.state.tgl_order,
        id_supplier: this.state.id_supplier,
        kd_barang: this.state.kd_barang,
        jumlah: this.state.jumlah
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
    fetch("http://localhost:3001/pesanan", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_order: this.state.kd_order,
        tgl_order: this.state.tgl_order,
        id_supplier: this.state.id_supplier,
        kd_barang: this.state.kd_barang,
        jumlah: this.state.jumlah
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
                    <Label for="kd_order">Kode Order</Label>
                    <Input
                      value={this.state.kd_order}
                      name="kd_order"
                      id="kd_order"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="tgl_order">Tanggal Order</Label>
                    <Input
                      type="date"
                      value={this.state.tgl_order}
                      name="tgl_order"
                      id="tgl_order"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="id_supplier">Id Supplier</Label>
                    <Input
                      value={this.state.id_supplier}
                      name="id_supplier"
                      id="id_supplier"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
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
                  <th>KD_ORDER</th>
                  <th>TGL_ORDER</th>
                  <th>ID_SUPPLIER</th>
                  <th>KD_BARANG</th>
                  <th>JUMLAH</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem.map(dataField => {
                  return (
                    <tr key={dataField.kd_order}>
                      <td>{dataField.kd_order}</td>
                      <td>{dataField.tgl_order.slice(0, 10)}</td>
                      <td>{dataField.id_supplier}</td>
                      <td>{dataField.kd_barang}</td>
                      <td>{dataField.jumlah}</td>
                      <td>
                        <button
                          className="fa fa-edit mr-2"
                          onClick={this.handleUpdate}
                          data_id={dataField.kd_order}
                        />
                        <button
                          className="fa fa-trash"
                          onClick={this.onDelete}
                          data_id={dataField.kd_order}
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

export default Pesanan;
