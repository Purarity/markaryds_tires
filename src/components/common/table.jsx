import React, { Component } from "react";
import { Link } from "react-router-dom";

class Table extends Component {
  render() {
    const tableColumns = [
      { path: "img", label: "Image" },
      { path: "name", label: "Name" },
      { path: "description", label: "Description" },
      { path: "price", label: "Price" },
      { path: "stock", label: "Stock" },
      { path: "delete", label: "" }
    ];
    const { data } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {tableColumns.map(header => {
              return <th key={header.path}>{header.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return this.renderCell(item, tableColumns);
          })}
        </tbody>
      </table>
    );
  }

  renderCell(item, tableColumns) {
    const { onDelete } = this.props;
    return (
      <tr key={item.id}>
        {tableColumns.map(cell => {
          if (cell.path === "img") {
            let img;
            try {
              img = require(`../../imgs/${item.id}.jpg`);
            } catch (error) {
              img = require(`../../imgs/placeholder.jpg`);
            }
            return (
              <td key={img}>
                <img
                  src={img}
                  className="img-fluid"
                  alt={img}
                  width="128"
                  height="128"
                ></img>
              </td>
            );
          } else if (cell.path === "name") {
            return (
              <td key={cell.path}>
                <Link to={`/product/${item.id}`}>{item.name}</Link>
              </td>
            );
          } else if (cell.path === "delete") {
            return (
              <td key={cell.path + item.id}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            );
          } else {
            return <td key={cell.path}>{item[cell.path]}</td>;
          }
        })}
      </tr>
    );
  }
}

export default Table;
