import React, { Component } from "react";
import { deleteItem, getReservations } from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";

class DisplayReservations extends Component {
  state = {
    data: [],
    searchQuery: ""
  };

  componentDidMount() {
    this.setState({ data: getReservations() });
  }

  handleDelete = productId => {
    const updatedTiresList = deleteItem(productId);
    this.setState({ data: updatedTiresList });
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGroup: "All Prices" });
  };

  getVisibleOrders = () => {
    const { data, searchQuery } = this.state;
    let displayedOrders;
    if (searchQuery) {
      displayedOrders = data.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      displayedOrders = data;
    }
    return displayedOrders;
  };

  render() {
    const { searchQuery } = this.state;
    const productsColumns = [
      { path: "id", label: "#" },
      { path: "name", label: "Name" },
      { path: "descriptions", label: "Descriptions" }
      // ,{ path: "betalning", label: "Betalning" }
    ];
    const reservations = this.getVisibleOrders();
    return (
      <React.Fragment>
        <div className="p-3">
          <div className="row">
            <div className="col">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </div>
          </div>
        </div>
        <Table
          noLinks={true}
          columns={productsColumns}
          data={reservations}
          onDelete={this.handleDelete}
        ></Table>
      </React.Fragment>
    );
  }
}

export default DisplayReservations;
