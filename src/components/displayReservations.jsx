import React, { Component } from "react";
import _ from "lodash";
import {
  deleteItem,
  getReservations
} from "../api/fakeApi";
import Table from "./common/table";
import SearchBox from "./common/searchBox";

class DisplayReservations extends Component {
  state = {
    data: [],
    searchQuery: "",
    sortColumn: { column: "name", order: "asc" }
  };

  componentDidMount() {
    this.setState({ data: getReservations() });
  }

  handleDelete = productId => {
    const updatedTiresList = deleteItem(productId);
    this.setState({ data: updatedTiresList });
  };

  handleSearch = searchQuery => {
    this.setState({
      searchQuery
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getVisibleOrders = () => {
    const { data, searchQuery, sortColumn } = this.state;
    let displayedOrders;
    if (searchQuery) {
      displayedOrders = data.filter(product =>
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    } else {
      displayedOrders = data;
    }

    const sortedOrders = _.orderBy(
      displayedOrders,
      [sortColumn.column],
      sortColumn.order
    );

    return sortedOrders;
  };

  handleBetalningButton = (id, property) => {
    const { data } = this.state;
    const reservations = [...data];
    const index = _.findIndex(data, { id: id });
    const path = [index, "betalning", property];
    _.set(reservations, path, !_.get(reservations, path));
    if (!_.get(reservations, path)) {
      _.set(
        reservations,
        [index, "betalning", "betald"],
        false
      );
    }
    this.setState({ data: reservations });
  };

  render() {
    const { searchQuery, sortColumn } = this.state;
    const reservations = this.getVisibleOrders();

    const productsColumns = [
      { path: "id", label: "#" },
      { path: "name", label: "Name" },
      { path: "productId", label: "Product Id" },
      { path: "notes", label: "Notes" },
      {
        key: "betalning",
        label: "Betalning",
        renderObjectProperty: reservation => {
          const faktureradClassName = "mr-3 btn btn-".concat(
            reservation.betalning.fakturerad
              ? "info"
              : "outline-info"
          );
          const betaldClassName = "btn btn-".concat(
            reservation.betalning.betald
              ? "success"
              : "outline-success"
          );
          return (
            <div>
              <button
                type="button"
                className={faktureradClassName}
                style={{ cursor: "default" }}
                onClick={() => {
                  this.handleBetalningButton(
                    reservation.id,
                    "fakturerad"
                  );
                }}
              >
                Fakturerad
              </button>
              <button
                type="button"
                className={betaldClassName}
                style={{ cursor: "default" }}
                disabled={!reservation.betalning.fakturerad}
                onClick={() => {
                  this.handleBetalningButton(
                    reservation.id,
                    "betald"
                  );
                }}
              >
                Betald
              </button>
            </div>
          );
        }
      }
    ];

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
          data={reservations}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
        ></Table>
      </React.Fragment>
    );
  }
}

export default DisplayReservations;
