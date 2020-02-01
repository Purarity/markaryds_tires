import React, { Component } from "react";
import _ from "lodash";
import { getCustomersList } from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";

class DisplayCustomers extends Component {
  state = {
    data: [],
    searchQuery: "",
    sortColumn: { column: "name", order: "asc" }
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getVisibleCustomers = () => {
    const { data, searchQuery, sortColumn } = this.state;
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
    const sortedItems = _.orderBy(
      displayedCustomers,
      [sortColumn.column],
      sortColumn.order
    );

    return sortedItems;
  };

  render() {
    const { searchQuery, sortColumn } = this.state;
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
          sortColumn={sortColumn}
          columns={productsColumns}
          onSort={this.handleSort}
          data={products}
          onDelete={this.handleDelete}
        ></Table>
      </React.Fragment>
    );
  }
}

export default DisplayCustomers;
