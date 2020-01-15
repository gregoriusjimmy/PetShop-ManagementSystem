import React from "react";
import {
  Card,
  CardBody,
  Table,
  Col,
  Row,
  Button,
  // Form,
  // FormGroup,
  Label,
  Input,
  CardHeader
} from "reactstrap";
import { utilsOnRead, utilsOnAdd } from "../../utils/crud.utils";

class Laporan extends React.Component {
  constructor() {
    super();
    this.state = {
      allLaporan: [],
      currentLaporan: null
    };
  }
  async componentDidMount() {
    const data = await utilsOnRead("http://localhost:3001/laporan");
    this.setState({ allLaporan: data });
  }

  handleSelectLaporan(event) {
    const dataId = event.target.attributes.data_id.value;
    const found = this.state.allLaporan.find(laporan => {
      return laporan.laporanId === dataId;
    });
    console.log(found);
    this.setState({
      currentLaporan: found
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.currentLaporan ? null : (
          <Card>
            <CardHeader>
              <h2>Daftar Laporan</h2>
            </CardHeader>
            <CardBody>
              <Table hover>
                <thead>
                  <tr>
                    <th>ID_LAPORAN</th>
                    <th>NAMA_LAPORAN</th>
                    <th>PERIODE_LAPORAN</th>
                    <th>Open</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.allLaporan
                    ? this.state.allLaporan.map(laporan => {
                        return (
                          <tr key={laporan.idLaporan}>
                            <td>{laporan.idLaporan}</td>
                            <td>{laporan.namaLaporan.toUpperCase()}</td>
                            <td>{laporan.tglLaporan}</td>
                            <td>
                              <Button
                                color="success"
                                className="fa fa-window-maximize mr-2"
                                onClick={this.handleSelectLaporan}
                                data_id={laporan.idLaporan}
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
        )}
      </div>
    );
  }
}

export default Laporan;
