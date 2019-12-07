import React, { Component } from "react";
import {
  Card,
  CardBody,
  Table,
  // Col,
  // Row,
  Button
  // Form,
  // FormGroup,
  // Label,
  // Input
} from "reactstrap";
// const initialState = {
//   tabelItem: [],
//   kd_order: "",
//   tgl_order: "",
//   id_supplier: "",
//   kd_barang: "",
//   jumlah: ""
// };

class TransaksiBeli extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: []
    };
  }
  readData = () => {
    fetch("http://localhost:3001/transaksi_beli")
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
  componentDidMount() {
    this.readData();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>KD_BELI</th>
                  <th>TGL_BELI</th>
                  <th>ID_SUPPLIER</th>
                  <th>KD_BARANG</th>
                  <th>JUMLAH</th>
                  <th>HARGA_TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem
                  ? this.state.tabelItem.map(dataField => {
                      return (
                        <tr key={dataField.kd_beli}>
                          <td>{dataField.kd_beli}</td>
                          <td>{dataField.tgl_beli.slice(0, 10)}</td>
                          <td>{dataField.id_supplier}</td>
                          <td>{dataField.kd_barang}</td>
                          <td>{dataField.jumlah}</td>
                          <td>{dataField.harga_total}</td>
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

export default TransaksiBeli;
