import React from "react";
import "./App.css";
import DisplayAllProducts from "./components/displayAllProducts";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductPage from "./components/productPage";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import BookingPage from "./components/bookingPage";
import DisplayCustomers from "./components/displayCustomers";
import DisplayReservations from "./components/displayReservations";
import Shop from "./components/shop";

function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route
          path="/product/:id"
          render={props => <ProductPage {...props} />}
        />
        <Route path="/shop/:id" render={props => <BookingPage {...props} />} />
        <Route path="/admin/reservations" component={DisplayReservations} />
        <Route path="/admin/customers" component={DisplayCustomers} />
        <Route path="/login" component={LoginForm} />
        <Route path="/shop" component={Shop} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/admin/allProducts" component={DisplayAllProducts}></Route>
        <Redirect path="/" exact to="/shop"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
