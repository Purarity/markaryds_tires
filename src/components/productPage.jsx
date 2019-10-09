import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getProduct, saveProduct } from "../api/fakeApi";

class movieForm extends Form {
  state = {
    data: {
      id: "",
      name: "",
      description: "",
      stock: "",
      price: ""
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
      .label("Price")
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
    this.props.history.push("/allProducts");
    saveProduct(this.state.data);
  };

  render() {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <h1>Product Form</h1>
        {id === "new" ? this.renderInput("id", "id") : null}
        {this.renderInput("name", "Name")}
        {this.renderInput("description", "Description")}
        {this.renderInput("stock", "Stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save", this.doSubmit)}
      </React.Fragment>
    );
  }
}

export default movieForm;
