import "./App.css";
import TestComponent from "./components/TestComponent";
import Navbar from "./components/layout/MyNavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Products from "./components/pages/Products";
import ProductForm from "./components/pages/products/ProductForm";
import Update from "./components/pages/products/Update";
import AuthGuard from "./components/auth/AuthGuard";
import Cart from "./components/pages/cart/Cart";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <Router>
      <CookiesProvider>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/products/add">
            <ProductForm />
          </Route>
          <Route path="/products/update/:id">
            <Update />
          </Route>
          <Route path="/products">
            <AuthGuard>
              <Products />
            </AuthGuard>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </CookiesProvider>
    </Router>
  );
}

export default App;
