import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../api/authService";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .min(3)
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = () => {
    const { email, password } = this.state.data;
    const errors = login(email, password);
    this.setState({ errors });
    if (!errors) {
      return this.props.history.push("/");
    }
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password")}
          {this.renderButton("Login", "auth")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
