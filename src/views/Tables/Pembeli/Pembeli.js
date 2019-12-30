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

import {
  utilsOnRead,
  utilsOnAdd,
  utilsOnDelete,
  utilsOnUpdate
} from "../../../utils/crud.utils";

const INITIAL_STATE = {
  tabelItem: [],
  id_pembeli: "",
  nama: "",
  alamat: "",
  no_telp: "",
  searchField: ""
};

const SOURCE = "http://localhost:3001/pembeli";

class Pembeli extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      id_pembeli: "",
      nama: "",
      alamat: "",
      no_telp: "",
      searchField: ""
    };
  }
  componentDidMount() {
    this.readData();
  }
  refresh = status => {
    if (status === 200) {
      this.setState(INITIAL_STATE);
      this.readData();
    }
  };

  readData = async () => {
    const data = await utilsOnRead(SOURCE);
    if (data) {
      this.setState({ tabelItem: data });
    }
  };

  onDelete = async event => {
    const dataSend = { id_pembeli: event.target.attributes.data_id.value };
    const status = await utilsOnDelete(SOURCE, dataSend);
    this.refresh(status);
  };

  onAdd = async () => {
    const { id_pembeli, nama, alamat, no_telp } = this.state;
    if (!id_pembeli || !nama || !alamat || !no_telp) {
      return alert("field tidak boleh kosong");
    }
    const dataSend = {
      id_pembeli: this.state.id_pembeli,
      nama: this.state.nama,
      alamat: this.state.alamat,
      no_telp: this.state.no_telp
    };
    const status = await utilsOnAdd(SOURCE, dataSend);
    this.refresh(status);
  };

  onUpdate = async () => {
    const { nama, alamat, no_telp } = this.state;
    if (!nama || !alamat || !no_telp) {
      return alert("field tidak boleh kosong");
    }
    const dataSend = {
      id_pembeli: this.state.id_pembeli,
      nama: this.state.nama,
      alamat: this.state.alamat,
      no_telp: this.state.no_telp
    };
    const status = await utilsOnUpdate(SOURCE, dataSend);
    this.refresh(status);
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  handleUpdate = event => {
    const dataId = event.target.attributes.data_id.value;
    const found = this.state.tabelItem.find(dataField => {
      return dataField.id_pembeli === dataId;
    });
    this.setState({
      id_pembeli: found.id_pembeli,
      nama: found.nama,
      alamat: found.alamat,
      no_telp: found.no_telp
    });
  };

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
    console.log(event.target.value);
  };
  filterField = () => {
    const { tabelItem, searchField } = this.state;
    return tabelItem.filter(field => {
      return field.nama.toUpperCase().includes(searchField.toUpperCase());
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
                    <Label for="id_pembeli">Id Pembeli</Label>
                    <Input
                      value={this.state.id_pembeli}
                      name="id_pembeli"
                      id="id_pembeli"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nama">Nama </Label>
                    <Input
                      value={this.state.nama}
                      name="nama"
                      id="nama"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="alamat">Alamat</Label>
                    <Input
                      value={this.state.alamat}
                      name="alamat"
                      id="alamat"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="no_telp">No Telp</Label>
                    <Input
                      value={this.state.no_telp}
                      name="no_telp"
                      id="no_telp"
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
                    placeholder="Nama Pembeli"
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
                  <th>ID_PEMBELI</th>
                  <th>NAMA</th>
                  <th>ALAMAT</th>
                  <th>NO_TELP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem
                  ? this.filterField().map(dataField => {
                      return (
                        <tr key={dataField.id_pembeli}>
                          <td>{dataField.id_pembeli}</td>
                          <td>{dataField.nama}</td>
                          <td>{dataField.alamat}</td>
                          <td>{dataField.no_telp}</td>
                          <td>
                            <Button
                              color="success"
                              className="fa fa-edit mr-2"
                              onClick={this.handleUpdate}
                              data_id={dataField.id_pembeli}
                            />
                            <Button
                              color="danger"
                              className="fa fa-trash"
                              onClick={this.onDelete}
                              data_id={dataField.id_pembeli}
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

export default Pembeli;
