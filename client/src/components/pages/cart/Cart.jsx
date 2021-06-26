import React from "react";
import { useCookies } from "react-cookie";

const Cart = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [myCartProducts, setMyCartProducts] = React.useState([]);
  const total = myCartProducts.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.price;
  }, 0);
  React.useEffect(() => {
    if (cookies.cart) {
      setMyCartProducts(cookies.cart);
    }
  }, [cookies]);
  return (
    <div className="container">
      <h3>Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {myCartProducts.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Grand Total</td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
