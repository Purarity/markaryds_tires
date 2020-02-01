import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NarBar extends Component {
  state = { token: "" };

  componentDidMount() {
    this.setState({ token: localStorage.token });
  }

  handleLogout = () => {
    this.setState({ token: "" });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Markaryd's Tires
        </Link>
        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/reservations"
              >
                Reservations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/customers"
              >
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/allProducts"
              >
                Products
              </NavLink>
            </li>
            {this.state.token ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/logout"
                  onClick={this.handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={this.handleLogin}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NarBar;
