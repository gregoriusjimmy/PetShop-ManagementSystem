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
import { formatMoney } from "../../utils/utils";
import { utilsOnRead } from "../../utils/crud.utils";
import TabelPerkiraan from "./tabel-perkiraan.component";
class Perkiraan extends React.Component {
  constructor() {
    super();
    this.state = {
      dataPerkiraan: [],
      dataSaldoAll: [],
      totalDebitKreditModal: null,
      startDate: "",
      endDate: ""
    };
  }
  calculateSaldoAll = dataPerkiraan => {
    const dataSaldoPerkiraan = [];
    dataPerkiraan.forEach(fieldPerkiraan => {
      let debit = [];
      let kredit = [];
      let jenis_saldo;
      let formatedSaldo;
      fieldPerkiraan.forEach(perkiraan => {
        if (perkiraan.debit) {
          debit.push(parseInt(perkiraan.debit.replace(/[Rp.]+/g, "")));
        } else {
          kredit.push(parseInt(perkiraan.kredit.replace(/[Rp.]+/g, "")));
        }
      });
      const totalDebit = debit.reduce((a, b) => a + b, 0);
      const totalKredit = kredit.reduce((a, b) => a + b, 0);

      const saldo = totalDebit - totalKredit;
      if (saldo < 0) {
        jenis_saldo = "KREDIT";
        formatedSaldo = formatMoney(Math.abs(saldo));
      } else {
        jenis_saldo = "DEBIT";
        formatedSaldo = formatMoney(saldo);
      }

      const data = {
        nama_akun: fieldPerkiraan[0].nama_akun,
        no_akun: fieldPerkiraan[0].no_akun,
        total_debit: `Rp${formatMoney(totalDebit)}`,
        total_kredit: `Rp${formatMoney(totalKredit)}`,
        jenis_saldo: jenis_saldo,
        saldo: `Rp${formatedSaldo}`
      };
      dataSaldoPerkiraan.push(data);
    });
    return dataSaldoPerkiraan;
  };

  calculateModal = (totalDebitAll, totalKreditAll) => {
    return totalDebitAll - totalKreditAll;
  };

  calculateTotalDebitAndKredit = dataSaldoAll => {
    const debit = [];
    const kredit = [];

    dataSaldoAll.forEach(dataSaldo => {
      debit.push(parseInt(dataSaldo.total_debit.replace(/[Rp.]+/g, "")));
      kredit.push(parseInt(dataSaldo.total_kredit.replace(/[Rp.]+/g, "")));
      console.log(kredit);
    });
    const totalDebitAll = debit.reduce((a, b) => a + b, 0);
    const totalKreditAll = kredit.reduce((a, b) => a + b, 0);

    const modal = this.calculateModal(totalDebitAll, totalKreditAll);
    return {
      totalDebitAll: `Rp${formatMoney(totalDebitAll)}`,
      totalKreditAll: `Rp${formatMoney(totalKreditAll)}`,
      modal: `Rp${formatMoney(modal)}`
    };
  };
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
      console.log(sortedData);
      const indexModal = sortedData.findIndex(
        dataSaldo => dataSaldo[0].nama_akun === "MODAL"
      );
      sortedData.splice(indexModal, 1);
      const dataSaldoAll = this.calculateSaldoAll(data);
      console.log(dataSaldoAll);

      console.log(dataSaldoAll);
      const totalDebitKreditModal = this.calculateTotalDebitAndKredit(
        dataSaldoAll
      );
      this.setState({
        dataPerkiraan: sortedData,
        dataSaldoAll: dataSaldoAll,
        totalDebitKreditModal
      });
    }
  };

  render() {
    const { dataPerkiraan } = this.state;

    return (
      <div className="animated fadeIn">
        {dataPerkiraan.length < 1 ? (
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
        ) : null}
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
        {this.state.totalDebitKreditModal ? (
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h3>Debit</h3>
                  <h4>{this.state.totalDebitKreditModal.totalDebitAll}`</h4>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <h3>Kredit</h3>
                  <h4>{this.state.totalDebitKreditModal.totalKreditAll}`</h4>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <h3>Modal</h3>
                  <h4>{this.state.totalDebitKreditModal.modal}`</h4>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }
}

export default Perkiraan;
