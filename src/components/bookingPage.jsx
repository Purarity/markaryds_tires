import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getProduct,
  saveReservation
} from "../api/fakeApi";

class BookingPage extends Form {
  state = {
    data: {
      id: "",
      name: "",
      shopperName: "",
      description: "",
      stock: "",
      price: "",
      notes: ""
    },
    errors: {}
  };

  async componentDidMount() {
    const { match, history } = this.props;

    const id = match.params.id;
    if (id === "new") {
      return;
    }

    const product = getProduct(id);

    if (!product) {
      return history.replace("/404");
    }

    this.setState({ data: this.mapToViewModel(product) });
  }

  schema = {
    id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    shopperName: Joi.string()
      .required()
      .label("Name"),
    description: Joi.string()
      .required()
      .label("Description"),
    stock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Stock"),
    price: Joi.number()
      .min(0)
      .max(2000)
      .required()
      .label("Price"),
    notes: Joi.string()
      .label("Notes")
      .min(0)
      .max(2000)
  };

  mapToViewModel = product => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price
    };
  };

  doSubmit = () => {
    saveReservation(this.state.data);
    this.props.history.push("/shop");
  };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h1>Product Form</h1>
          <div>Product Name: {data.name} </div>
          <div>
            Product Descriptions: {data.description}{" "}
          </div>
          <div>Product Stock: {data.stock} </div>
          <div>Product Price: {data.price} </div>
          {this.renderInput("shopperName", "Name:")}
          {this.renderInput("notes", "Notes to workshop:")}
          {this.renderButton("Order")}
        </form>
      </React.Fragment>
    );
  }
}

export default BookingPage;
