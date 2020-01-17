import React from "react";
import { Card, CardBody, Table, Button, CardHeader } from "reactstrap";
import LaporanContainer from "./laporan-container.component";
import { utilsOnRead } from "../../utils/crud.utils";

class Laporan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLaporan: [],
      currentLaporan: null
    };
  }
  async componentDidMount() {
    const data = await utilsOnRead("http://localhost:3001/laporan");
    this.setState({ allLaporan: data }, () =>
      console.log(this.state.allLaporan)
    );
  }

  handleSelectLaporan = event => {
    const { allLaporan } = this.state;
    const dataId = event.target.attributes.data_id.value;
    console.log(dataId);
    const found = allLaporan.find(laporan => {
      return laporan.idLaporan === dataId;
    });
    console.log(found);
    this.setState({
      currentLaporan: found
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.currentLaporan ? (
          <LaporanContainer dataLaporan={this.state.currentLaporan} />
        ) : (
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
