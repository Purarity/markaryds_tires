import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTiresList, deleteProduct } from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";

class DisplayAllProducts extends Component {
  state = { data: [], searchQuery: "" };

  componentDidMount() {
    this.setState({ data: getTiresList() });
  }

  handleDelete = productId => {
    const updatedTiresList = deleteProduct(productId);
    this.setState({ data: updatedTiresList });
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  getVisibleProducts = () => {
    const { data, searchQuery } = this.state;
    let searchedProducts;
    if (searchQuery) {
      searchedProducts = data.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return data;
    }
    return searchedProducts;
  };

  render() {
    const { searchQuery } = this.state;
    const products = this.getVisibleProducts();
    return (
      <React.Fragment>
        <div className="p-3" align="left">
          <Link to="/product/new" className="btn btn-primary">
            New Product
          </Link>
        </div>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <Table data={products} onDelete={this.handleDelete}></Table>
      </React.Fragment>
    );
  }
}

export default DisplayAllProducts;
