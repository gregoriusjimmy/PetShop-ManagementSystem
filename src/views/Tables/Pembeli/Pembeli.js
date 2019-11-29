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
  id_pembeli: "",
  nama: "",
  alamat: "",
  no_telp: ""
};
class Pembeli extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: [],
      id_pembeli: "",
      nama: "",
      alamat: "",
      no_telp: ""
    };
  }
  readData = () => {
    fetch("http://localhost:3001/pembeli")
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
      return dataField.id_pembeli === dataId;
    });
    this.setState({
      id_pembeli: found.id_pembeli,
      nama: found.nama,
      alamat: found.alamat,
      no_telp: found.no_telp
    });
  };
  onDelete = event => {
    fetch("http://localhost:3001/pembeli", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pembeli: event.target.attributes.data_id.value
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
    fetch("http://localhost:3001/pembeli", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pembeli: this.state.id_pembeli,
        nama: this.state.nama,
        alamat: this.state.alamat,
        no_telp: this.state.no_telp
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
    fetch("http://localhost:3001/pembeli", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pembeli: this.state.id_pembeli,
        nama: this.state.nama,
        alamat: this.state.alamat,
        no_telp: this.state.no_telp
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
                  <th>ID_PEMBELI</th>
                  <th>NAMA</th>
                  <th>ALAMAT</th>
                  <th>NO_TELP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem.map(dataField => {
                  return (
                    <tr key={dataField.id_pembeli}>
                      <td>{dataField.id_pembeli}</td>
                      <td>{dataField.nama}</td>
                      <td>{dataField.alamat}</td>
                      <td>{dataField.no_telp}</td>
                      <td>
                        <button
                          className="fa fa-edit mr-2"
                          onClick={this.handleUpdate}
                          data_id={dataField.id_pembeli}
                        />
                        <button
                          className="fa fa-trash"
                          onClick={this.onDelete}
                          data_id={dataField.id_pembeli}
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

export default Pembeli;
