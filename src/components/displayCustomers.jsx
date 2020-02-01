import React, { Component } from "react";
import { getCustomersList } from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";

class DisplayCustomers extends Component {
  state = {
    data: [],
    searchQuery: ""
  };

  componentDidMount() {
    this.setState({ data: getCustomersList() });
  }

  handleSearch = searchQuery => {
    this.setState({
      searchQuery,
      selectedGroup: "All Prices"
    });
  };

  getVisibleCustomers = () => {
    const { data, searchQuery } = this.state;
    let displayedCustomers;
    if (searchQuery) {
      displayedCustomers = data.filter(product =>
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    } else {
      displayedCustomers = data;
    }
    return displayedCustomers;
  };

  render() {
    const { searchQuery } = this.state;
    const productsColumns = [
      { path: "id", label: "#" },
      { path: "name", label: "Name" },
      { path: "email", label: "Email" },
      {
        path: "telephoneNumber",
        label: "Telephone Number"
      },
      { path: "address", label: "Address" }
    ];
    const products = this.getVisibleCustomers();
    return (
      <React.Fragment>
        <div className="p-3">
          <div className="row">
            <div className="col">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
              />
            </div>
          </div>
        </div>
        <Table
          noLinks={true}
          columns={productsColumns}
          data={products}
          onDelete={this.handleDelete}
        ></Table>
      </React.Fragment>
    );
  }
}

export default DisplayCustomers;
