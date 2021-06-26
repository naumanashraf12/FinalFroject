import React from "react";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import apiService from "./../../services/ApiService";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
const Products = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [products, setProducts] = React.useState([]);
  const total = products.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.price;
  }, 0);
  const getData = () => {
    apiService.getProducts().then((res) => {
      setProducts(res.data);
    });
  };

  React.useEffect(getData, []);
  React.useEffect(() => {
    if (!cookies.cart) {
      setCookie("cart", JSON.stringify([]));
    }
  }, []);
  const addProductToCart = (product) => {
    let newCart = [...cookies.cart];
    newCart.push(product);
    setCookie("cart", JSON.stringify(newCart));
    toast.success(product.name + " added to Cart");
  };
  const history = useHistory();
  return (
    <div>
      <h2>Protected Products</h2>
      <Link to="/products/add" className="btn btn-info">
        Add New Product
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <img src={p.picture} width="100px" />
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={(e) => {
                    addProductToCart(p);
                  }}
                >
                  Add To Card
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    apiService
                      .delete("/api/products" + p._id)
                      .then((res) => {
                        getData();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    history.push("/products/update/" + p._id);
                  }}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
