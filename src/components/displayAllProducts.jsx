import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTiresList, deleteItem } from "../api/fakeApi";
import _ from "lodash";
import Table from "./common/table";
import SearchBox from "./common/searchBox";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import paginate from "./utils/paginate";

class DisplayAllProducts extends Component {
  state = {
    data: [],
    searchQuery: "",
    priceGroups: [],
    selectedGroup: "All Prices",
    sortColumn: { column: "name", order: "asc" },
    pageSize: 3,
    currentPage: 1
  };

  componentDidMount() {
    const priceGroups = [
      { range: "All Prices" },
      { range: "500-600" },
      { range: "601-700" },
      { range: "701-800" },
      { range: "801-900" },
      { range: "901-1000" }
    ];
    this.setState({ data: getTiresList(), priceGroups });
  }

  handleDelete = productId => {
    const updatedList = deleteItem(productId);
    this.setState({ data: updatedList });
  };

  deleteButton = itemId => {
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => this.handleDelete(itemId)}
      >
        Delete
      </button>
    );
  };

  handleSearch = searchQuery => {
    this.setState({
      searchQuery,
      selectedGroup: "All Prices",
      currentPage: 1
    });
  };

  handleGroupSelect = group => {
    this.setState({
      currentPage: 1,
      searchQuery: "",
      selectedGroup: group.range
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getVisibleProducts = () => {
    const {
      data,
      searchQuery,
      selectedGroup,
      currentPage,
      pageSize,
      sortColumn
    } = this.state;

    let filteredItems;

    if (searchQuery) {
      filteredItems = data.filter(product =>
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    } else {
      switch (selectedGroup) {
        //#region filter prices
        case "500-600":
          filteredItems = data.filter(
            item => item.price >= 500 && item.price < 600
          );
          break;
        case "601-700":
          filteredItems = data.filter(
            item => item.price >= 601 && item.price < 700
          );
          break;
        case "701-800":
          filteredItems = data.filter(
            item => item.price >= 701 && item.price <= 800
          );
          break;
        case "801-900":
          filteredItems = data.filter(
            item => item.price >= 801 && item.price <= 900
          );
          break;
        case "901-1000":
          filteredItems = data.filter(
            item => item.price >= 901 && item.price <= 1000
          );
          break;

        default:
          filteredItems = data;
          break;
        //#endregion
      }
    }

    const sortedItems = _.orderBy(
      filteredItems,
      [sortColumn.column],
      sortColumn.order
    );

    return {
      count: filteredItems.length,
      visibleItems: paginate(
        sortedItems,
        currentPage,
        pageSize
      )
    };
  };

  render() {
    const {
      searchQuery,
      priceGroups,
      selectedGroup,
      pageSize,
      currentPage,
      sortColumn
    } = this.state;

    const {
      visibleItems,
      count
    } = this.getVisibleProducts();

    const productsColumns = [
      { path: "img", label: "Image" },
      { path: "name", label: "Name" },
      { path: "description", label: "Description" },
      { path: "price", label: "Price" },
      { path: "stock", label: "Stock" },
      {
        key: "delete",
        renderObjectProperty: item => (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.handleDelete(item.id)}
          >
            Delete
          </button>
        )
      }
    ];
    return (
      <React.Fragment>
        <div className="p-3">
          <div className="row">
            <Link
              to="/product/new"
              className="btn btn-primary"
            >
              New Product
            </Link>
            <div className="col">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
              />
            </div>
          </div>
          <div>
            <div className="pt-2" align="left">
              <div className="row">
                <ListGroup
                  groups={priceGroups}
                  selectedGroup={selectedGroup}
                  onGroupSelect={this.handleGroupSelect}
                ></ListGroup>
              </div>
            </div>
          </div>
        </div>
        <Table
          columns={productsColumns}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          data={visibleItems}
          onDelete={this.handleDelete}
        ></Table>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemsCount={count}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default DisplayAllProducts;
