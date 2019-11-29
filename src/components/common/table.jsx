import React, { Component } from "react";
import { Link } from "react-router-dom";

class Table extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => {
              return <th key={column.path || column.key}>{column.label}</th>;
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
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                )}
              </td>
            );
          } else if (column.key) {
            return (
              <td key={(column.path || column.key) + item._id}>
                {column.handleObjectProperty(item)}
              </td>
            );
          } else {
            return <td key={column.path}>{item[column.path]}</td>;
          }
        })}
      </tr>
    );
  }
}

export default Table;
