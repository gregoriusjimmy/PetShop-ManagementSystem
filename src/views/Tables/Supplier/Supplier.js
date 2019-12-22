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

import {
  utilsOnRead,
  utilsOnAdd,
  utilsOnDelete,
  utilsOnUpdate
} from "../../../utils/crud.utils";

const INITIAL_STATE = {
  tabelItem: [],
  id_supplier: "",
  nama_supplier: "",
  alamat: "",
  no_telp: ""
};

const SOURCE = "http://localhost:3001/supplier";

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      id_supplier: "",
      nama_supplier: "",
      alamat: "",
      no_telp: ""
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
    const dataSend = { id_supplier: event.target.attributes.data_id.value };
    const status = await utilsOnDelete(SOURCE, dataSend);
    this.refresh(status);
  };

  onAdd = async () => {
    const { id_supplier, nama_supplier, alamat, no_telp } = this.state;
    if (!id_supplier || !nama_supplier || !alamat || !no_telp) {
      return alert("field tidak boleh kosong");
    }
    const dataSend = {
      id_supplier: this.state.id_supplier,
      nama_supplier: this.state.nama_supplier,
      alamat: this.state.alamat,
      no_telp: this.state.no_telp
    };
    const status = await utilsOnAdd(SOURCE, dataSend);
    this.refresh(status);
  };

  onUpdate = async () => {
    const { nama_supplier, alamat, no_telp } = this.state;
    if (!nama_supplier || !alamat || !no_telp) {
      return alert("field tidak boleh kosong");
    }
    const dataSend = {
      id_supplier: this.state.id_supplier,
      nama_supplier: this.state.nama_supplier,
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
      return dataField.id_supplier === dataId;
    });
    this.setState({
      id_supplier: found.id_supplier,
      nama_supplier: found.nama_supplier,
      alamat: found.alamat,
      no_telp: found.no_telp
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
                    <Label for="id_supplier">Id Supplier</Label>
                    <Input
                      value={this.state.id_supplier}
                      name="id_supplier"
                      id="id_supplier"
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nama_supplier">Nama Supplier</Label>
                    <Input
                      value={this.state.nama_supplier}
                      name="nama_supplier"
                      id="nama_supplier"
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
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>ID_SUPPLIER</th>
                  <th>NAMA_SUPPLIER</th>
                  <th>ALAMAT</th>
                  <th>NO_TELP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem
                  ? this.state.tabelItem.map(dataField => {
                      return (
                        <tr key={dataField.id_supplier}>
                          <td>{dataField.id_supplier}</td>
                          <td>{dataField.nama_supplier}</td>
                          <td>{dataField.alamat}</td>
                          <td>{dataField.no_telp}</td>
                          <td>
                            <Button
                              color="success"
                              className="fa fa-edit mr-2"
                              onClick={this.handleUpdate}
                              data_id={dataField.id_supplier}
                            />
                            <Button
                              color="danger"
                              className="fa fa-trash"
                              onClick={this.onDelete}
                              data_id={dataField.id_supplier}
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

export default Supplier;
