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
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
const initialState = {
  tabelItem: [],
  kd_barang: "",
  nama_barang: "",
  satuan: "",
  harga_jual: "",
  harga_beli: "",
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
      harga_jual: "",
      harga_beli: "",
      stok_barang: "",
      searchField: ""
    };
  }

  readData = () => {
    fetch("http://localhost:3001/item")
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to fetch");
        }
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
      harga_jual: found.harga_jual,
      harga_beli: found.harga_beli,
      stok_barang: found.stok_barang
    });
  };
  onDelete = event => {
    fetch("http://localhost:3001/item", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kd_barang: event.target.attributes.data_id.value
      })
    })
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to delete");
        }
        return response.json();
      })
      .then(data => {
        this.readData();
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
        harga_beli: this.state.harga_jual,
        harga_jual: this.state.harga_beli,
        stok_barang: this.state.stok_barang
      })
    })
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to add");
        }
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
        harga_beli: this.state.harga_jual,
        harga_jual: this.state.harga_beli,
        stok_barang: this.state.stok_barang
      })
    })
      .then(response => {
        if (response.status === 400) {
          return alert("Failed to update");
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
  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
    console.log(event.target.value);
  };
  filterField = () => {
    const { tabelItem, searchField } = this.state;
    return tabelItem.filter(field => {
      return field.nama_barang
        .toUpperCase()
        .includes(searchField.toUpperCase());
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
                <Col md={3}>
                  <FormGroup>
                    <Label for="satuan">Satuan</Label>
                    <Input
                      type="select"
                      value={this.state.satuan}
                      name="satuan"
                      id="satuan"
                      onChange={this.handleChange}
                    >
                      <option value="KG">KG</option>
                      <option value="PCS">PCS</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="harga_jual">Harga Jual</Label>
                    <Input
                      value={this.state.harga_jual}
                      name="harga_jual"
                      id="harga_jual"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="harga_beli">Harga Beli</Label>
                    <Input
                      value={this.state.harga_beli}
                      name="harga_beli"
                      id="harga_beli"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
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
            <Button color="primary" onClick={this.onUpdate}>
              Update
            </Button>{" "}
          </CardBody>
        </Card>
        <Row>
          <Col md={5}>
            <Card>
              <CardBody>
                <InputGroup>
                  <Input
                    onChange={this.onSearchChange}
                    placeholder="Nama Barang"
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="fa fa-search"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>KD_BRNG</th>
                  <th>NAMA_BRNG</th>
                  <th>SATUAN</th>
                  <th>HARGA_JUAL</th>
                  <th>HARGA_BELI</th>
                  <th>STOK_BRNG</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem
                  ? this.filterField().map(dataField => {
                      return (
                        <tr key={dataField.kd_barang}>
                          <td>{dataField.kd_barang}</td>
                          <td>{dataField.nama_barang}</td>
                          <td>{dataField.satuan}</td>
                          <td>{dataField.harga_jual}</td>
                          <td>{dataField.harga_beli}</td>
                          <td>{dataField.stok_barang}</td>
                          <td>
                            <Button
                              color="success"
                              className="fa fa-edit mr-2"
                              onClick={this.handleUpdate}
                              data_id={dataField.kd_barang}
                            />
                            <Button
                              color="danger"
                              className="fa fa-trash"
                              onClick={this.onDelete}
                              data_id={dataField.kd_barang}
                            />
                          </td>
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

export default Barang;
