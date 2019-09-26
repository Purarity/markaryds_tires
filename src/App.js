import React from "react";
import "./App.css";
import DisplayAllProducts from "./components/displayAllProducts";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductPage from "./components/productPage";

function App() {
  return (
    <div className="container" align="middle">
      <Switch>
        <Route
          path="/product/:id"
          render={props => <ProductPage {...props} />}
        />
        <Route path="/allProducts" component={DisplayAllProducts}></Route>
        <Redirect path="/" exact to="/allProducts"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
