import React from "react";
import "./App.css";
import DisplayAllProducts from "./components/displayAllProducts";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductPage from "./components/productPage";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <div className="container" align="middle">
      <NavBar />
      <Switch>
        <Route
          path="/product/:id"
          render={props => <ProductPage {...props} />}
        />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/allProducts" component={DisplayAllProducts}></Route>
        <Redirect path="/" exact to="/allProducts"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
