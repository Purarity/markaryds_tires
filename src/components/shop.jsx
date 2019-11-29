import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTiresList, deleteItem } from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";
import ListGroup from "./common/listGroup";

class Shop extends Component {
  state = {
    data: [],
    searchQuery: "",
    priceGroups: [],
    selectedGroup: "All Prices"
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

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGroup: "All Prices" });
  };

  handleGroupSelect = group => {
    this.setState({
      currentPage: 1,
      searchQuery: "",
      selectedGroup: group.range
    });
  };

  getVisibleProducts = () => {
    const { data, searchQuery, selectedGroup } = this.state;
    let displayedProducts;
    if (searchQuery) {
      displayedProducts = data.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      switch (selectedGroup) {
        //#region filter prices
        case "500-600":
          displayedProducts = data.filter(
            item => item.price >= 500 && item.price < 600
          );
          break;
        case "601-700":
          displayedProducts = data.filter(
            item => item.price >= 601 && item.price < 700
          );
          break;
        case "701-800":
          displayedProducts = data.filter(
            item => item.price >= 701 && item.price <= 800
          );
          break;
        case "801-900":
          displayedProducts = data.filter(
            item => item.price >= 801 && item.price <= 900
          );
          break;
        case "901-1000":
          displayedProducts = data.filter(
            item => item.price >= 901 && item.price <= 1000
          );
          break;

        default:
          displayedProducts = data;
          break;
        //#endregion
      }
    }
    return displayedProducts;
  };

  handleBook = itemId => {};
  render() {
    const { searchQuery, priceGroups, selectedGroup } = this.state;
    const productsColumns = [
      { path: "img", label: "Image" },
      { path: "name", label: "Name" },
      { path: "description", label: "Description" },
      { path: "price", label: "Price" },
      { path: "stock", label: "Stock" },
      {
        key: "book",
        handleObjectProperty: item => (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.handleBook(item.id)}
          >
            <Link to={`/shop/${item.id}`}>Book</Link>
          </button>
        )
      }
    ];
    const products = this.getVisibleProducts();
    return (
      <React.Fragment>
        <div className="p-3">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
          noLinks={true}
          columns={productsColumns}
          data={products}
          onDelete={this.handleDelete}
        ></Table>
      </React.Fragment>
    );
  }
}

export default Shop;
