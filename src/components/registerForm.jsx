import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../api/authService";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      telephoneNumber: "",
      address: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .min(3)
      .label("Email"),
    telephoneNumber: Joi.string()
      .required()
      .min(9)
      .label("Telephone Number"),
    address: Joi.string()
      .required()
      .min(9)
      .label("Address"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    register(this.state.data);
    return this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password")}
          {this.renderInput(
            "telephoneNumber",
            "Telephone Number"
          )}
          {this.renderInput("address", "Address")}
          {this.renderButton("Register", "auth")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
