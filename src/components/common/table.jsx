import React from "react";
import { Link } from "react-router-dom";

const Table = ({ data }) => {
  const tableColumns = [
    { path: "img", label: "Image" },
    { path: "name", label: "Name" },
    { path: "description", label: "Description" },
    { path: "price", label: "Price" },
    { path: "stock", label: "Stock" }
  ];
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
          return (
            <tr key={item.id}>
              {tableColumns.map(cell => {
                if (cell.path === "img") {
                  const img = require(`../../imgs/${item.id}.jpg`);
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
                } else {
                  return <td key={cell.path}>{item[cell.path]}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
