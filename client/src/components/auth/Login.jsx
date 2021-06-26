import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apiService from "./../../services/ApiService";
import Footer from "./../pages/Footer";
const Login = () => {
  const [user, setUser] = React.useState({
    email: "naumanashraf30@gmail.com",
    password: "123",
  });
  const submit = () => {
    apiService
      .post("/api/auth", user)
      .then((res) => {
        toast.success("Logged In");
        console.log(res.data);
        localStorage.setItem("token", res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        if (err.response) toast.error(err.response.data);
      })
      .finally(() => {});
  };
  return (
    <div>
      <div style={{ padding: 100 }}>
        <h4>Login</h4>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <div className="form-group pt-3">
          <button className="btn btn-info" onClick={submit}>
            Login
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
