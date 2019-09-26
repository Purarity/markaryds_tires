import React, { Component } from "react";
import { getTiresList } from "../api/fakeApi";
import Table from "./common/table";

class DisplayAllProducts extends Component {
  state = { data: [] };

  componentDidMount() {
    this.setState({ data: getTiresList() });
  }

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <Table data={data}></Table>
      </React.Fragment>
    );
  }
}

export default DisplayAllProducts;
