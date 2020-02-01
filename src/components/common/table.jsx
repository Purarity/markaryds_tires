import React, { Component } from "react";
import { Link } from "react-router-dom";

class Table extends Component {
  sortIconClassNames = (sortColumn, currentColumn) => {
    let sortClassName = "fas fa-caret-";
    if (sortColumn.column === currentColumn.path) {
      sortClassName +=
        sortColumn.order === "asc" ? "down" : "up";
    }
    return sortClassName;
  };

  raiseSort = column => {
    const { sortColumn, onSort } = this.props;
    if (sortColumn.column === column) {
      sortColumn.order =
        sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  render() {
    const { data, columns, sortColumn } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => {
              return (
                <th
                  key={column.path || column.key}
                  onClick={() =>
                    this.raiseSort(column.path)
                  }
                >
                  {column.label}
                  <i
                    className={this.sortIconClassNames(
                      sortColumn,
                      column
                    )}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return this.renderCell(item, columns);
          })}
        </tbody>
      </table>
    );
  }

  renderCell(item, columns) {
    return (
      <tr key={item.id}>
        {columns.map(column => {
          if (column.path === "img") {
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
                  width="64"
                  height="64"
                ></img>
              </td>
            );
          } else if (column.path === "name") {
            return (
              <td key={column.path}>
                {this.props.noLinks ? (
                  item.name
                ) : (
                  <Link to={`/product/${item.id}`}>
                    {item.name}
                  </Link>
                )}
              </td>
            );
          } else if (column.key) {
            return (
              <td
                key={(column.path || column.key) + item._id}
              >
                {column.renderObjectProperty(item)}
              </td>
            );
          } else {
            return (
              <td key={column.path}>{item[column.path]}</td>
            );
          }
        })}
      </tr>
    );
  }
}

export default Table;
