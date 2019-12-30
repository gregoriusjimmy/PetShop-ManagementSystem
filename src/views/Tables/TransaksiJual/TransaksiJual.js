import React, { Component } from "react";
import { Card, CardBody, Table } from "reactstrap";

import { utilsOnRead } from "../../../utils/crud.utils";

const SOURCE = "http://localhost:3001/transaksi_jual";
class Transaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelItem: []
    };
  }

  readData = async () => {
    const data = await utilsOnRead(SOURCE);
    if (data) {
      this.setState({ tabelItem: data });
    }
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
                  <th>KD_JUAL</th>
                  <th>TGL_JUAL</th>
                  <th>ID_PEMBELI</th>
                  <th>KD_BARANG</th>
                  <th>JUMLAH</th>
                  <th>HARGA_NORMAL</th>
                  <th>POTONGAN</th>
                  <th>HARGA_TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tabelItem
                  ? this.state.tabelItem.map(dataField => {
                      return (
                        <tr key={dataField.kd_jual}>
                          <td>{dataField.kd_jual}</td>
                          <td>{dataField.tgl_jual.slice(0, 10)}</td>
                          <td>{dataField.id_pembeli}</td>
                          <td>{dataField.kd_barang}</td>
                          <td>{dataField.jumlah}</td>
                          <td>{dataField.harga_normal}</td>
                          <td>{dataField.potongan}</td>
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

export default Transaksi;
