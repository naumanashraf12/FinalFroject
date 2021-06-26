import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./../pages/Footer";
import apiService from "./../../services/ApiService";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = React.useState({
    name: "Usman Akram",
    email: "musmanakram@cuilahore.edu.pk",
    password: "usman",
  });
  const submit = () => {
    apiService
      .post("/api/users", user)
      .then((res) => {
        console.log(res.data);
        alert("registered success");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) alert(err.response.data);
        else alert("Unable to Register");
      })
      .finally(() => {});
  };

  return (
    <div>
      <div style={{ padding: 100 }}>
        <h4>Register New Account</h4>
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
        </div>
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
        <div style={{ padding: 29 }} className="form-group pt-3">
          <button className="btn btn-info" onClick={submit}>
            Register
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
