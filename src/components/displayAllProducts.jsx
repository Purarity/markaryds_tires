import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTiresList, deleteProduct } from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";
import ListGroup from "./common/listGroup";

class DisplayAllProducts extends Component {
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

  handleDelete = productId => {
    const updatedTiresList = deleteProduct(productId);
    this.setState({ data: updatedTiresList });
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGroup: "All Prices" });
  };

  handleGroupSelect = group => {
    this.setState({ selectedGroup: group.range });
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
            item => item.price >= 701 && item.price < 800
          );
          break;
        case "801-900":
          displayedProducts = data.filter(
            item => item.price >= 801 && item.price < 900
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
      return displayedProducts;
    }
    return displayedProducts;
  };

  render() {
    const { searchQuery, priceGroups, selectedGroup } = this.state;
    const products = this.getVisibleProducts();
    return (
      <React.Fragment>
        <div className="p-3">
          <div className="row">
            <Link to="/product/new" className="btn btn-primary">
              New Product
            </Link>
            <div className="col">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
        <Table data={products} onDelete={this.handleDelete}></Table>
      </React.Fragment>
    );
  }
}

export default DisplayAllProducts;
