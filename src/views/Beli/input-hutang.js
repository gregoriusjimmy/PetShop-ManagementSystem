import React from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

const InputHutang = ({ handleChange, dpBeliValue }) => (
  <FormGroup row>
    <Col md="3">
      <Label htmlFor="dpBeli">Jumlah yang dibayar</Label>
    </Col>
    <Col xs="12" md="9">
      <Input
        id="dpBeli"
        name="dpBeliValue"
        value={dpBeliValue}
        onChange={handleChange}
      />
    </Col>
  </FormGroup>
);
export default InputHutang;
