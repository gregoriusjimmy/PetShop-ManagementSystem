import React from "react";
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
  CardHeader
} from "reactstrap";
import { utilsOnRead } from "../../utils/crud.utils";
import TabelPerkiraan from "./tabel-perkiraan.component";
class Perkiraan extends React.Component {
  constructor() {
    super();
    this.state = {
      dataPerkiraan: [],
      startDate: "",
      endDate: ""
    };
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  bubbleSort = items => {
    const length = items.length;
    //Number of passes
    for (let i = 0; i < length; i++) {
      //Notice that j < (length - i)
      for (let j = 0; j < length - i - 1; j++) {
        //Compare the adjacent positions
        if (items[j][0].no_akun > items[j + 1][0].no_akun) {
          //Swap the numbers
          let tmp = items[j]; //Temporary variable to hold the current number
          items[j] = items[j + 1]; //Replace current number with adjacent number
          items[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
    return items;
  };
  handleSet = async () => {
    const { startDate, endDate } = this.state;
    let convertStartDate = "";
    let convertEndDate = "";
    let data = null;
    const source = "http://localhost:3001/perkiraan";
    if (startDate && endDate) {
      convertStartDate = new Date(startDate);
      convertEndDate = new Date(endDate);
      const response = await fetch(source, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: convertStartDate,
          endDate: convertEndDate
        })
      });
      data = await response.json();
    } else {
      data = await utilsOnRead(source);
    }

    if (data) {
      const sortedData = this.bubbleSort(data);
      this.setState({ dataPerkiraan: sortedData }, () =>
        console.log(this.state.dataPerkiraan)
      );
    }
  };
  render() {
    const { dataPerkiraan } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={7}>
            <Card>
              <CardHeader>Set tanggal</CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <Input
                      name="startDate"
                      type="date"
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <Label>sampai</Label>
                  </Col>
                  <Col md={4}>
                    <Input
                      name="endDate"
                      type="date"
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <Button color="success" onClick={this.handleSet}>
                      Set
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            {dataPerkiraan
              ? dataPerkiraan.map(perkiraan => {
                  return (
                    <TabelPerkiraan
                      key={perkiraan[0].no_akun}
                      perkiraan={perkiraan}
                    />
                  );
                })
              : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Perkiraan;
