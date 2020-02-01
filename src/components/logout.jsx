import React, { Component } from "react";

class Logout extends Component {
  state = { token: "" };
  componentDidMount() {
    const token = localStorage.token;
    this.setState({ token });
  }
  render() {
    localStorage.removeItem("token");
    this.props.history.replace("/");
    return null;
  }
}

export default Logout;
